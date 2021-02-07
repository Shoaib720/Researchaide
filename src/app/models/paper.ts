
export class Paper{

    paperId : string;
    title : string;
    keywords : string[];
    areaOfResearch : string;
    authors: string[];
    uploadedBy: string;
    cid: string
    publicationDate: Date;
    path: string;
    status: Number 

    constructor(paperApiResponse: any){
        this.paperId = paperApiResponse._id;
        this.title = paperApiResponse.title;
        this.keywords = paperApiResponse.keywords;
        this.areaOfResearch = paperApiResponse.areaOfResearch;
        this.authors = paperApiResponse.authors;
        this.uploadedBy = paperApiResponse.uploadedBy;
        this.cid = paperApiResponse.college;
        this.publicationDate = paperApiResponse.publicationDate;
        this.path = paperApiResponse.path;
        this.status = paperApiResponse.statusCode;

    }
}