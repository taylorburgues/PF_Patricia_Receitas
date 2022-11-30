import React from 'react';
import { Routes, Route } from "react-router-dom";
import Main from './components/template/Main';
import Login from './components/Login/Login'
import CrudReceitas from './components/CrudReceitas/Receitas'
import Home from './components/Home/Home'


export default function Rotas() {
    return (
        <Routes>
            <Route exact path='/'
                element=
                    {<Home />}
            />
            <Route path='/receitas' element={<CrudReceitas />} />
            <Route path='/login' element={<Login />} />
        </Routes>
    ) 
}