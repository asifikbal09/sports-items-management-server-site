import { Branch } from "../modules/branch/branch.model"
import { IUser } from "../modules/user/user.interface"
import { User } from "../modules/user/user.model"

const MainBranch = {
    name:"Main Branch",
    address: "Mirpur DOHS, Dhaka-1216 Bangladesh",
    longitude: 90.3666,
    latitude: 23.8103
}

const Admin = {
    name: "Admin User",
    email: "admin@mail.com",
    password: "admin123",
    role: "ADMIN",
    imgUrl: "https://example.com/admin.jpg",
    address: "123 Admin St, Admin City",
    contactNo: "1234567890",
    branchId: "" // This will be set after creating the main branch
}

const seed = async () => {
    const isMainBranch = await Branch.findOne({name: "Main Branch"})  
    if(!isMainBranch){
        const mainBranch = await Branch.create(MainBranch)
        if(!mainBranch){
            throw new Error("Failed to create main branch")
        }
        Admin.branchId = mainBranch._id.toString()
        await User.create(Admin as unknown as IUser)
    }
}

export default seed