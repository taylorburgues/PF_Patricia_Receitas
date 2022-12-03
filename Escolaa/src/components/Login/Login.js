import "./Login.css"

function Login() {
  return (
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


      <div class='icon-credits'>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a>, <a href="http://www.flaticon.com/authors/budi-tanrim" title="Budi Tanrim">Budi Tanrim</a> & <a href="http://www.flaticon.com/authors/nice-and-serious" title="Nice and Serious">Nice and Serious</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>

    </div>
  );
}

export default Login;
