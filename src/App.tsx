import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {Container} from "@mui/material";
import MenuAppBar from "./components/MenuAppBar";
import  UsersPage  from "./pages/UsersPage";

import {createGlobalState} from "react-hooks-global-state";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DepartmentsPage from "./pages/DepartmensPage";

const { useGlobalState } = createGlobalState({ departments: [] });
function App() {
    const [departments, setDep] = useGlobalState('departments');

  return (
      <BrowserRouter>

        <MenuAppBar/>
        <Container maxWidth="xl">

          <Routes>
            <Route
                path="/"
                element={<Navigate to="/users" />}
            />
              <Route path="/register" element={<RegisterPage/>}/>
              <Route path="/login" element={<LoginPage/>}/>
              <Route path="/users" element={<UsersPage/>}/>
              <Route path="/departments" element={<DepartmentsPage/>}/>

          </Routes>

        </Container>

      </BrowserRouter>
  );
}

export default App;
