import { IAuthToken } from "./auth-token";

export class AuthData {
    private _uid: string;
    private _email: string;
    
    private _name: string;
    
    private _role: string;
    private _cid: string;
    private _token: string;
    private _expirationDate: Date;

    public get uid(): string {
        return this._uid;
    }

    public get email(): string {
        return this._email;
    }

    public get name(): string {
        return this._name;
    }

    public get role(): string {
        return this._role;
    }

    public get cid(): string {
        return this._cid;
    }

    public get token(): string {
        if(new Date(this._expirationDate) < new Date()){
            return null;
        }
        return this._token;
    }

    public get expirationDate(): Date {
        return this._expirationDate;
    }


    constructor(authToken: IAuthToken, token: string) {
        this._uid = authToken.uid;
        this._email = authToken.email;
        this._name = authToken.name;
        this._role = authToken.role;
        this._cid = authToken.cid;
        this._token = token;
        this._expirationDate = new Date((new Date().getTime()) + authToken.expiresIn * 1000);
    }
}