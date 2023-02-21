import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

export default function UsersTable(props:any) {
    const {deleteUser,editUser,userDepartment ,users }=props






    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>id</TableCell>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>AFM</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.length &&
                        users.map((user:any,index:number) => {
                            return (
                                <TableRow
                                    key={user.id}
                                >
                                    <TableCell component="th" scope="row">
                                        {user.id}
                                    </TableCell>
                                    <TableCell align="right">{user.firstName}</TableCell>
                                    <TableCell align="right">{user.lastName}</TableCell>
                                    <TableCell align="right">{user.email}</TableCell>
                                    <TableCell align="right">{user.afm}</TableCell>
                                    <TableCell align="right">

                                        <Button style={{marginLeft: "10px"}}
                                                variant="outlined" onClick={() => {
                                            deleteUser(user)
                                        }}>
                                            Delete
                                        </Button>
                                        <Button style={{marginLeft: "10px"}}
                                                variant="outlined" onClick={() => {
                                                    editUser(user)
                                        }}>
                                            Edit
                                        </Button>
                                        <Button style={{marginLeft: "10px"}}
                                                variant="outlined" onClick={() => {
                                            userDepartment(user)
                                        }}>
                                            userDepartment
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