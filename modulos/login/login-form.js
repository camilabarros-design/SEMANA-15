
document.addEventListener("DOMContentLoaded", function() {
  var form   = document.getElementById("form-login");
  var msgEl  = document.getElementById("msg-login");

  if (!form) return;

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    var login = document.getElementById("campo-login").value.trim();
    var senha = document.getElementById("campo-senha").value;

    if (!login || !senha) {
      msgEl.textContent = "Preencha o login e a senha.";
      msgEl.className   = "msg-login msg-erro";
      return;
    }

    var ok = loginUser(login, senha);

    if (ok) {
      msgEl.textContent = "Login realizado com sucesso! Redirecionando...";
      msgEl.className   = "msg-login msg-sucesso";
      setTimeout(function() {
        window.location.href = "../../index.html";
      }, 800);
    } else {
      msgEl.textContent = "Login ou senha incorretos. Tente novamente.";
      msgEl.className   = "msg-login msg-erro";
    }
  });
});
