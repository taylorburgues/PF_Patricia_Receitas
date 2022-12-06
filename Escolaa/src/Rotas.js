import React, {useState, useEffect} from 'react';
import { Routes, Route } from "react-router-dom";

import Main from './components/template/Main';
import CrudReceitas from './components/CrudReceitas/Receitas'
import AuthService from './components/services/AuthService';
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Logout from './components/Logout/Logout';


export default function Rotas() {
    const [currentUser, setCurrentUser] = useState(undefined);
    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    return (
        <Routes>
            {currentUser ? (
                <Route exact path='/'
                    element= {<Home />}
                />
            ) : (
                <Route exact path='/'
                    element= {
                        <Main title="Home">
                            <div>Você não tem acesso ao cadastro de receitas, vá para "Receitas" ou faça login.</div>
                        </Main>
                    }
                />
            ) }
            <Route path='/receitas' element={<CrudReceitas />} />
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
        </Routes>
    ) 
}