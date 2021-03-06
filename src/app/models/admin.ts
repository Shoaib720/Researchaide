export class Admin{
    adminId : String;
    email: String;
    name: String;
    contact: String;
    college: { cid: String, name: String, regNo: String } = { cid: "", name: "", regNo: "" };
    registeredBy: String;
    role: String = "admin";

    constructor(userApiResponse: any){
        this.adminId = userApiResponse._id;
        this.email = userApiResponse.email;
        this.name = userApiResponse.name;
        this.contact = userApiResponse.contact;
        this.registeredBy = userApiResponse.registeredBy;
    }
}