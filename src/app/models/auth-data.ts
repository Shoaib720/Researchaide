import { IAuthResponse } from "./auth-response";

export class AuthData {
    public _uid: string;
    public _email: string;
    public _name: string;
    public _role: string;
    public _college: {
        _cid: string;
        _name: string;
        _regNo: string;
    } = { _cid: "", _name: "", _regNo: "" };
    public _token: string;
    public _expirationDate: Date;


    constructor(authResponse: IAuthResponse) {
        this._uid = authResponse.uid;
        this._email = authResponse.email;
        this._name = authResponse.name;
        this._role = authResponse.role;
        this._college._cid = authResponse.college._id;
        this._college._name = authResponse.college.name;
        this._college._regNo = authResponse.college.registrationNo;
        this._token = authResponse.token;
        // this._expiresIn = authResponse.expiresIn;
        this._expirationDate = new Date((new Date().getTime()) + authResponse.expiresIn * 1000);
    }
}