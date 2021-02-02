// upload, getById, getByKeyword, getByCollege, getCountsByStatus, getByUploaderId, updateStatus, getUnverifiedPapersByCollegeId
const Paper = require('../models/paper');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);

function getday(){
    if ((new Date().getDate()) < 10){
        return `0${new Date().getDate()}`;
    }
    else{
        return `${new Date().getDate()}`;
    }
}

function getmonth(){
    if ((new Date().getMonth() + 1) < 10){
        return `0${new Date().getMonth() + 1}`;
    }
    else{
        return `${new Date().getMonth() + 1}`;
    }
}

const getAllPapers = (req, res, next) => {
    Paper.find()
    .then(papers => {
        res.status(200).json({
            message: "SUCCESS",
            data: papers
        });
    })
    .catch(err => {
        res.status(404).json({
            message: "NOT_FOUND"
        });
    });
}

const upload = (req, res, next) => {
    let filePath;
    const paper = new Paper({
        title: req.body.title,
        keywords: req.body.keywords.split(',').map(items => {return items.trim()}),
        areaOfResearch: req.body.areaOfResearch,
        authors: req.body.authors.split(',').map(items => {return items.trim()}),
        uploadedBy: req.body.uploadedBy,
        college: req.body.college,
        path: 'uploads/' + req.file.filename
    });
    filePath = paper.path;
    paper.save()
    .then(uploadedPaper => {
        res.status(201).json({
            message: "SUCCESS",
            data: uploadedPaper
        });
    })
    .catch(err => {
        unlinkAsync(filePath);
        if(err.errors.authors.name === "ValidatorError"){
            res.status(400).json({
                message: "AUTHORS_LIMIT_EXCEEDED"
            });
        }
        else{
            res.status(500).json({
                message: "INTERNAL_SERVER_ERROR",
                error: err
            });
        }
    });
}

const getByPaperId = (req, res, next) => {
    Paper.findOne({_id: req.params.id}).then(
        papers => {
            res.status(200).sendFile(path.join(__dirname , '../' + papers.path))
        }
    )
    .catch(err => {
        res.status(404).json({
            message: "NOT_FOUND",
            error: err
        })
    })
}

const getByKeywordAndAreaOfResearch = (req, res, next) => {
    Paper.aggregate([
        { $match: { 'areaOfResearch':req.params.area, 'keywords':req.params.keyword, 'statusCode': 2 } },
        { $sort: { 'publicationDate': -1 } },
        { $limit: 50 }
    ])
    .then(papers => {
        res.status(200).json({
        message: "SUCCESS",
        data: papers
        });
    })
    .catch(err => {
        res.status(404).json({
            message: "NOT_FOUND",
            error: err
        });
    });
}

const getByCollegeId = (req, res, next) => {
    Paper.find({college: req.params.collegeId})
    .then(papers => {
        res.status(200).json({
            message: "SUCCESS",
            data: papers
        })
    })
    .catch(err => {
        res.status(404).json({
            message: "NOT_FOUND",
            error: err
        })
    })
}

const getByUploaderId = (req, res, next) => {
    Paper.find({uploadedBy: req.params.uploaderId})
    .then(papers => {
        res.status(200).json({
            message: "SUCCESS",
            data: papers
        })
    })
    .catch(err => {
        res.status(404).json({
            message: "NOT_FOUND",
            error: err
        })
    })
}

const getUnverifiedPapersByCollegeId = (req, res, next) => {
    Paper.find({ college: req.params.collegeId, statusCode: 0 })
    .populate('college')
    .exec((err,papers) => {
        if(!err && papers){
            res.status(200).json({
                message: "SUCCESS",
                data: papers
            });
        }
        else{
            res.status(404).json({
                message: "NOT_FOUND",
                error: err
            });
        }
    })
}

const getCounts = (req, res, next) => { 
    Paper.aggregate([
        { $group: { _id: "$statusCode", count: { $sum: 1 } } },
        { $project: { _id: 0, statusCode: "$_id", count: 1 } }
    ])
    .then(countsData => {
        res.status(200).json({
            message: "SUCCESS",
            data: countsData
        });
    })
    .catch(err => {
        res.status(500).json({
            message: "INTERNAL_SERVER_ERROR",
            error: err
        });
    });
}

const getLatestVerifiedPapers = () => {
    Paper.aggregate([
        { $match: { statusCode: 2 } },
        { $sort: { publicationDate: -1 } },
        { $limit: 50 }
    ])
    .then(papers => {
        res.status(200).json({
            message: "SUCCESS",
            data: papers
        });
    })
    .catch(err => {
        res.status(500).json({
            message: "INTERNAL_SERVER_ERROR",
            error: err
        });
    });
}

const updateStatus = (req, res, next) => {
    if(req.body.status != 2){
        Paper.findByIdAndUpdate(
            { _id : req.params.id },
            {
                $set: {statusCode: req.body.status}
            },
            { new : true },
            (err, _) => {
                if(err){
                res.status(500).json({
                    message: "INTERNAL_SERVER_ERROR",
                    error: err
                });
                }else{
                res.status(201).json({
                    message: "SUCCESS"
                });
                }
            }
        );
    }else if(req.body.status == 2){
        const date = (new Date().getFullYear()).toString() + '-' + getmonth()  + '-' + getday();
        Paper.findByIdAndUpdate(
        { _id : req.params.id },
        {
            $set: {
                statusCode: req.body.status,
                publicationDate: date
            }
        },
        { new : true },
        (err, _) => {
            if(err){
            res.status(500).json({
                message: "INTERNAL_SERVER_ERROR",
                error: err
            });
            }else{
            res.status(201).json({
                message: "SUCCESS"
            });
            }
        }
        );
    } 
}

const deleteById = async (req, res, next) => {
    Paper.findByIdAndDelete({_id: req.params.id})
    .then((paper) => {
        unlinkAsync(paper.path)
        .then(resp => {
            console.log(resp)
        })
        .catch(err => {
            console.log(err)
        })
        res.status(200).json({
            message: "SUCCESS"
        });
    })
    .catch(err => {
        res.status(500).json({
            message: "INTERNAL_SERVER_ERROR",
            error: err
        });
    });
}

module.exports = {
    upload,
    getAllPapers,
    getByPaperId,
    getByKeywordAndAreaOfResearch,
    getByCollegeId,
    getByUploaderId,
    getUnverifiedPapersByCollegeId,
    getCounts,
    getLatestVerifiedPapers,
    updateStatus,
    deleteById
}