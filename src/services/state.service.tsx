import {IUser} from "./dto/Users.dto";
import {IDepartment} from "./dto/Departmetn.dto";
import {createGlobalState} from "react-hooks-global-state";


enum EActionType {

    add = "add",
    remove = "remove",
    edit = "edit"
}


export interface IModelAction {

    state:[];
    model: IUser;

    modelType: string;
    action_: EActionType;
}


const userReducer=(users:any, action:any)=> {

    switch (action.type) {
        case 'add': {
            const x = [...users, {
               ...action.user

            }];
            return  x
        }
        case 'edit': {
            return users.map((u:any) => {
                if (u.id === action.user.id) {
                    return action.user;
                } else {
                    return u;
                }
            });
        }
        case 'delete': {

            return users.filter((u:any) => u.id !== action.user.id)

        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

const departmentReducer=(department:any, action:any)=> {

    switch (action.type) {
        case 'add': {
            const x = [...department, {
                ...action.department

            }];
            return  x
        }
        case 'edit': {
            return department.map((u:any) => {
                if (u.id === action.department.id) {
                    return action.department;
                } else {
                    return u;
                }
            });
        }
        case 'delete': {

            return department.filter((u:any) => u.id !== action.department.id)

        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}


export { userReducer , departmentReducer}
