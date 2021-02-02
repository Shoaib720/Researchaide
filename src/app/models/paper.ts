
export class Paper{

    paperId : String;
    title : String;
    keywords : String[];
    areaOfResearch : String;
    authors: String[];
    uploadedBy: String;
    college: {
        cid: String,
        name: String,
        regNo: String
    } = {cid: "", name: "", regNo: ""};
    publicationDate: Date;
    path: String;
    status: Number 

    constructor(paperApiResponse: any){
        this.paperId = paperApiResponse._id;
        this.title = paperApiResponse.title;
        this.keywords = paperApiResponse.keywords;
        this.areaOfResearch = paperApiResponse.areaOfResearch;
        this.authors = paperApiResponse.authors;
        this.uploadedBy = paperApiResponse.uploadedBy;
        this.college.cid = paperApiResponse.college._id;
        this.college.name = paperApiResponse.college.name;
        this.college.regNo = paperApiResponse.college.registrationNo;
        this.publicationDate = paperApiResponse.publicationDate;
        this.path = paperApiResponse.path;
        this.status = paperApiResponse.statusCode;

    }
}