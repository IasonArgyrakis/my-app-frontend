export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    password?:string
    afm: string;
    email: string;
    departments:any[]
}

export interface IUserDepartment {
    id: number;
    title: string;

    inDepartment:boolean;
}