
import React, { useState } from "react";
import { useNavigate } from "react-router";

import "./Login.css";
import AuthService from "../../services/AuthService.js";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(evento) {
    evento.preventDefault();
    const userForm = { username, password };

    if (!username || !password) {
      setMessage("Preencha o username e a senha para continuar!");
    } else {
        AuthService.login(username, password).then(
          () => {
            console.log("localStorage: " + localStorage.getItem("user"));
            navigate("/");
            window.location.reload(); // atualiza o localStorage
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            setMessage(resMessage);
          }
        );
      }
  };

    return (
      
      <div className="content">
        <h1 className="tituloAuth">Login</h1>
        <form onSubmit={handleSubmit} className="formLogin" >
          <div>
            <label className="lblLogin" htmlFor="username">Username:</label>
            <input
              type="text"
              value={username}
              placeholder="Digite o e-mail"
              className="inputAuth"
              onChange={({ target }) => { setUsername(target.value);
                setMessage(""); }}
            />
          </div>

        <div>
          <label className="lblLogin" htmlFor="senha">Senha:</label>
          <input
            type="password"
            value={password}
            placeholder="Digite a senha"
            className="inputAuth"
            onChange={({ target }) => { setPassword(target.value); 
              setMessage(""); }}
          />
        </div>
        <button type="submit">Login</button>
        <h4 className="msgErro">{message}</h4>
      </form>
    </div>
   /* 
    <div>
    <div class='box'>
      <div class='box-form'>
        <div class='box-login-tab'></div>
        <div class='box-login-title'>
          <div class='i i-login'></div><h2>LOGIN</h2>
        </div>
        <div class='box-login'>
          <div class='fieldset-body' id='login_form'>
            <button onclick="openLoginInfo();" class='b b-form i i-more' title='Mais Informações'></button>
            <p class='field'>
              <label for='user'>NOME</label>
              <input type='text' id='user' name='user' title='Username' />
              <span id='valida' class='i i-warning'></span>
            </p>
            <p class='field'>
              <label for='pass'>SENHA</label>
              <input type='password' id='pass' name='pass' title='Password' />
              <span id='valida' class='i i-close'></span>
            </p>

            <label class='checkbox'>
              <input type='checkbox' value='TRUE' title='Continuar logado' /> Continuar Logado
            </label>

            <input type='submit' id='do_login' value='Fazer login' title='logar' />
          </div>
        </div>
      </div>
      <div class='box-info'>
        <p><button onclick="closeLoginInfo();" class='b b-info i i-left' title='Back to Sign In'></button><h3>Precisa de ajuda?</h3>
        </p>
        <div class='line-wh'></div>
        <button onclick="" class='b-support' title='esqueceu a senha?'> Esqueceu a senha?</button>
        <button onclick="" class='b-support' title='fale conosco'> Fale conosco</button>
        <div class='line-wh'></div>
        <button onclick="" class='b-cta' title='registro'> Criar conta</button>
      </div>
    </div>
  </div> */
  ); 
}
