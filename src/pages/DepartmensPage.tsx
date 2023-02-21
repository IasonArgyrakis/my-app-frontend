import {useEffect, useReducer, useState} from "react";
import DepartmentsTable from "../components/Department/Departments.table";


import {backend} from "../services/backend.service";
import {useNavigate} from "react-router-dom";
import AddDepartment from "../components/Department/AddDepartment";
import {DepartmentDetailsDialog} from "../components/Department/DepartmentDetailsDialog";
import {IDepartment} from "../services/dto/Departmetn.dto";

import { createGlobalState } from 'react-hooks-global-state';
import {departmentReducer} from "../services/state.service";

const { useGlobalState } = createGlobalState({ departments: [] });

const DepartmentsPage = () => {
    const nav = useNavigate();
    const [departments, setGlobalDepartments] = useGlobalState("departments");

    const [departments_state, dispatch] = useReducer(departmentReducer,[]);

    const [departmentEditOpen, OpenDepartmentDetails] = useState(false);

    let [selectedDepartment, selectDepartment] = useState<IDepartment>({
        id: 0,
        title:""
    });


    useEffect(() => {
        backend.get({
            url: '/departments',
            requiresToken: true
        }).then((data: any) => {
            console.log("Load")
            console.log(data)
            data.map((department:any)=>{
                console.log(department)
                dispatch({type:"delete",department:department})
                dispatch({type:"add",department:department})
                departmentReducer(departments,{type:"add",department:department})

            })



            console.log(departments)

        }).catch(()=>{
            nav('/login')
        })

    }, [])





    const submit = (values: any) => {


        console.log(values)
        dispatch({type:'add',department:values})

        setGlobalDepartments(departments_state)




    }


    const deleteDepartment = (department: IDepartment) => {
        console.log(departments_state)

        backend.delete({
            url: '/department',
            requiresToken: true,
            payload:department
        }).then((data: any) => {
            dispatch({type:'delete',department:department})
        }).catch(()=>{
            nav('/login')
        })
    };

    const editDepartment = (department: IDepartment) => {
        selectDepartment(department)
        OpenDepartmentDetails(true);
    };


    const handleClose = (value: any) => {
        console.log(value)
        dispatch({type:'edit',department:value})


        // backend.get({
        //     url: '/departments',
        //     requiresToken: true
        // }).then((data: any) => {
        //     console.log(data)
        //  dispatch({type:'edit',department:value})
        //     setDepartments(data)
        //
        // }).catch(()=>{
        //     nav('/login')
        // })

        OpenDepartmentDetails(false);
        selectDepartment({
            id: 0,
            title: "",
        })
    }
    return (
        <div>
            <AddDepartment onSubmit={submit}/>
           <DepartmentsTable departments={departments_state} editDepartment={editDepartment} deleteDepartment={deleteDepartment}/>
            {departmentEditOpen &&
                <DepartmentDetailsDialog
                    department={selectedDepartment}
                    open={departmentEditOpen}
                    onClose={handleClose}/>
            }

        </div>
    );

}
export default DepartmentsPage;