export interface IAuthResponse{
    uid: string;
    email: string;
    name: string;
    role: string;
    college: {
        _id: string;
        name: string;
        registrationNo: string;
    }
    token: string;
    expiresIn: number;
}