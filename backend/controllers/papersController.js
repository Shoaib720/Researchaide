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
            message: "Paper added!",
            data: uploadedPaper._id
        });
    })
    .catch(err => {
        unlinkAsync(filePath);
        if(err.errors.authors.name === "ValidatorError"){
            res.status(400).json({
                error: "AUTHORS_LIMIT_EXCEEDED"
            });
        }
        else{
            res.status(500).json({
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
    );
}

const getByKeywordAndAreaOfResearch = (req, res, next) => {
    Paper.aggregate([
        { $match: { 'areaOfResearch':req.params.area, 'keywords':req.params.keyword, 'statusCode': 2 } },
        { $sort: { 'publicationDate': -1 } },
        { $limit: 50 }
    ])
    .then(papers => {
        res.status(200).json({
        message: "Success",
        data: papers
        });
    })
    .catch(err => {
        res.status(404).json({
        error: err
        });
    });
}

const getByCollegeId = (req, res, next) => {
    Paper.find({college: req.params.collegeId})
    .then(papers => {
        res.status(200).json({
            message: "Success",
            data: papers
        })
    })
    .catch(err => {
        res.status(404).json({
            error: err
        })
    })
}

const getByUploaderId = (req, res, next) => {
    Paper.find({uploadedBy: req.params.uploaderId})
    .then(papers => {
        res.status(200).json({
            message: "Success",
            data: papers
        })
    })
    .catch(err => {
        res.status(404).json({
            error: err
        })
    })
}

const getUnverifiedPapersByCollegeId = (req, res, next) => {
    Paper.find({ college: req.params.collegeId, statusCode: 0 })
    .then(queries => {
      res.status(200).json({
        message: "Success",
        data: queries
      });
    })
    .catch(err => {
      res.status(404).json({
        error: err
      });
    });
}

const getCounts = (req, res, next) => { 
    Paper.aggregate([
        { $group: { _id: "$statusCode", count: { $sum: 1 } } },
        { $project: { _id: 0, statusCode: "$_id", count: 1 } }
    ])
    .then(countsData => {
        res.status(200).json({
            message: "Success",
            data: countsData
        });
    })
    .catch(err => {
        res.status(500).json({
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
            message: "Success",
            data: papers
        });
    })
    .catch(err => {
        res.status(500).json({
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
            (err, response) => {
                if(err){
                res.status(500).json({
                    error: err
                });
                }else{
                res.status(201).json({
                    message: "Paper Updated!",
                    data: response
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
        (err, response) => {
            if(err){
            res.status(500).json({
                error: err
            });
            }else{
            res.status(201).json({
                message: "Paper Updated!",
                data: response
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
            message: "Deleted Successfully",
            data: paper
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}

module.exports = {
    upload,
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