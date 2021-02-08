export class College{
    private _cid: string;
    private _name: string;
    private _regNo: string;

    public get cid(): string {
        return this._cid;
    }

    public get name(): string {
        return this._name;
    }

    public get regNo(): string {
        return this._regNo;
    }

    constructor(collegeApiResponse: any){
        this._cid = collegeApiResponse._id;
        this._name = collegeApiResponse.name;
        this._regNo = collegeApiResponse.registrationNo;
    }
}