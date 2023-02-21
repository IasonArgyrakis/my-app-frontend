import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

export default function DepartmentsTable(props:any) {
    const {deleteDepartment,editDepartment ,departments }=props






    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>id</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {departments.length &&
                        departments.map((department:any,index:number) => {
                            return (
                                <TableRow
                                    key={department.id}
                                >
                                    <TableCell component="th" scope="row">
                                        {department.id}
                                    </TableCell>
                                    <TableCell align="right">{department.title}</TableCell>
                                    <TableCell align="right">

                                        <Button style={{marginLeft: "10px"}}
                                                variant="outlined" onClick={() => {
                                            deleteDepartment(department)
                                        }}>
                                            Delete
                                        </Button>
                                        <Button style={{marginLeft: "10px"}}
                                                variant="outlined" onClick={() => {
                                                    editDepartment(department)
                                        }}>
                                            Edit
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}