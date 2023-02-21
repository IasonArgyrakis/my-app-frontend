import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import {useNavigate} from "react-router-dom";
import {MenuItem} from "@mui/material";
import {isLoggedIn, logout} from "../services/auth.service"


export default function MenuAppBar() {




    const navigate = useNavigate()




    function toNavigate(url: string) {
        navigate(url)
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                {!isLoggedIn() &&
                    <Toolbar>

                        <MenuItem onClick={() => toNavigate("/login")}>
                            Login

                        </MenuItem>
                        <MenuItem onClick={() => toNavigate("/register")}>
                            Register
                        </MenuItem>
                    </Toolbar>
                }
                {isLoggedIn() &&
                    <Toolbar>
                        <MenuItem onClick={() => toNavigate("/users")}>
                            Users

                        </MenuItem>
                        <MenuItem onClick={() => toNavigate("/departments")}>
                            Departments
                        </MenuItem>
                        <MenuItem onClick={() => {logout() ;toNavigate("/login") }}>
                            Log Out
                        </MenuItem>
                    </Toolbar>
                }
            </AppBar>
        </Box>
    );
}
