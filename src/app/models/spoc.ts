export class SPOC{
    spocId : String;
    email: String;
    name: String;
    contact: String;
    college: { cid: String, name: String, regNo: String } = { cid: "", name: "", regNo: "" };
    registeredBy: String;
    role: String = "spoc";

    constructor(userApiResponse: any){
        this.spocId = userApiResponse._id;
        this.email = userApiResponse.email;
        this.name = userApiResponse.name;
        this.contact = userApiResponse.contact;
        if(userApiResponse.college){
            this.college.cid = userApiResponse.college._id;
            this.college.name = userApiResponse.college.name;
            this.college.regNo = userApiResponse.college.registrationNo;
        }
        this.registeredBy = userApiResponse.registeredBy;
    }
}