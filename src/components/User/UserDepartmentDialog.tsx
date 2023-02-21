import * as React from 'react';
import Button from '@mui/material/Button';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {useEffect, useState} from "react";
import {Checkbox} from "@mui/material";
import {IUser} from "../../services/dto/Users.dto";
import {backend} from "../../services/backend.service";
import {departmentReducer} from "../../services/state.service";
import {IDepartment} from "../../services/dto/Departmetn.dto";


export interface UserDepartmentDialogProps {
    open: boolean;
    user: IUser;
    departments:any[];
    onClose: (value: object) => void;

}

export function UserDepartmentDialog(props: UserDepartmentDialogProps) {
    let {user, open ,departments, onClose} = props;

    const [userState, userStateUpdate] = useState(user)



    const makeCheckBoxes = () => {
        const user={...props.user}
        return departments.map((department: any) => {


            if (user.departments.findIndex(ud => ud.id === department.id) ===-1) {
                return {title: department.title, id: department.id, checked: false}
            }else {
                return {title: department.title, id: department.id, checked: true}
            }

        })


    }


    const [userCheckboxes, userCheckboxes_] = useState<any[]>(makeCheckBoxes)


    const closeModal = () => {
        let temp_user=user
        temp_user.departments=userCheckboxes;

        onClose({...temp_user})
    }


    const fieldStyle = {
        padding: "10px"
    }


    const handleCheck = (index: number) => {
        const userUpdate = {
            url: `/departments/${userCheckboxes[index].id}/user/${userState.id}`,
            requiresToken: true
        }

        if (userCheckboxes[index].checked) {
            backend.delete(userUpdate).then(() => {
                userCheckboxes[index].checked = !userCheckboxes[index].checked;
                userCheckboxes_([...userCheckboxes])
            }).catch(() => {

            })
        } else {
            backend.put(userUpdate).then(() => {
                userCheckboxes[index].checked = !userCheckboxes[index].checked;
                userCheckboxes_([...userCheckboxes])
            }).catch(() => {

            })
        }


    }


    return (
        <Dialog onClose={closeModal} open={open}>
            <DialogTitle>Update user Info</DialogTitle>
            <div style={fieldStyle}>

                {userCheckboxes.map((department, index) => {


                        return (
                            <div key={index}>
                                <Checkbox
                                    checked={userCheckboxes[index].checked}
                                    value={department.id}
                                    onClick={() => handleCheck(index)}
                                />
                                {department.title}
                                <br/>
                            </div>)
                    }
                )}

                <Button

                    variant="contained"
                    color="primary"
                    onClick={closeModal}
                >
                    Finished
                </Button>
            </div>

        </Dialog>
    );
}

