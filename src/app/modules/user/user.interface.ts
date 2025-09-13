export type IUser={
    id:string;
    name:string;
    email:string;
    password:string;
    role:"admin" | "manager" | "seller";
    imgUrl?:string;
    address?:string;
    contactNo?:string;
}