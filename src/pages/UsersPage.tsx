import {useEffect, useReducer, useState} from "react";
import UsersTable from "../components/User/Users.table";
import AddUser from "../components/User/AddUser";
import { userReducer} from "../services/state.service";
import {IUser} from "../services/dto/Users.dto";
import {UserDepartmentDialog} from "../components/User/UserDepartmentDialog";
import {UserDetailsDialog} from "../components/User/UserDetailsDialog";
import {backend} from "../services/backend.service";
import {useNavigate} from "react-router-dom";

const UsersPage = () => {
    const nav = useNavigate();

    const [users_state, dispatch] = useReducer(userReducer,[]);

    const [userEditOpen, OpenUserDetails] = useState(false);
    const [userDepartmentOpen, OpenUserDepartments] = useState(false);

    let [selectedUser, selectUser] = useState<IUser>({
        afm: "",
        email: "",
        firstName: "",
        id: 0,
        lastName: "",
        departments: [],
        password: ""
    });


    useEffect(() => {
        backend.get({
            url: '/users',
            requiresToken: true
        }).then((data: any) => {
            console.log("Load")
            console.log(data)
            data.map((user:any)=>{
                console.log(user)
                dispatch({type:"delete",user:user})
                dispatch({type:"add",user:user})

            })
            console.log(users_state)

        }).catch(()=>{
            nav('/login')
        })

    }, [])

    const [departmentsState, departmentsStateUpdate] = useState([])

    useEffect(()=>{
        backend.get({
            url: '/departments',
            requiresToken: true
        }).then((data: any) => {
            console.log(data)
            departmentsStateUpdate(data)
        }).catch(() => {

        });
    },[])





    const submit = (values: any) => {


        console.log(values)
        console.log(users_state)





    }


    const deleteUser = (user: IUser) => {
        console.log(users_state)

        backend.delete({
            url: '/users',
            requiresToken: true,
            payload:user
        }).then((data: any) => {
            dispatch({type:'delete',user:user})
        }).catch(()=>{
            nav('/login')
        })
    };

    const editUser = (user: IUser) => {
        console.log(user)
        selectUser(user)
        OpenUserDetails(true);
    };

    const userDepartment = (user: IUser) => {
        console.log(user)
        selectUser(user)
        OpenUserDepartments(true);
    };

    const handleClose = (value: any) => {
        console.log(value)
        dispatch({type:'edit',user:value})


        backend.get({
            url: '/users',
            requiresToken: true
        }).then((data: any) => {
            console.log("Load")
            console.log(data)
            data.map((user:any)=>{
                console.log(user)
                dispatch({type:"delete",user:user})
                dispatch({type:"add",user:user})

            })
            console.log(users_state)

        }).catch(()=>{
            nav('/login')
        })

        OpenUserDepartments(false);
        OpenUserDetails(false);
        selectUser({
            afm: "",
            email: "",
            firstName: "",
            id: 0,
            lastName: "",
            password: "",
            departments: [],
        })
    }
    return (
        <div>
            <AddUser onSubmit={submit}/>
           <UsersTable users={users_state} userDepartment={userDepartment} editUser={editUser} deleteUser={deleteUser}/>
            {userDepartmentOpen &&
                <UserDepartmentDialog
                    departments={departmentsState}
                    user={selectedUser}
                    open={userDepartmentOpen}
                    onClose={handleClose}/>
            }
            {userEditOpen &&
                <UserDetailsDialog
                    user={selectedUser}
                    open={userEditOpen}
                    onClose={handleClose}/>
            }

        </div>
    );

}
export default UsersPage;