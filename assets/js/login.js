
const _usuariosBD = [
  { id: 1, nome: "Admin", login: "admin", senha: "123", email: "admin@ibirite.mg" },
  { id: 2, nome: "Usuário", login: "user",  senha: "123", email: "user@ibirite.mg"  }
];

var usuarioCorrente = null;

function initLoginApp() {
  var stored = sessionStorage.getItem("usuarioCorrente");
  if (stored) {
    usuarioCorrente = JSON.parse(stored);
  }
  _atualizarMenuLogin();
}

function loginUser(login, senha) {
  var usuario = _usuariosBD.find(function(u) {
    return u.login === login && u.senha === senha;
  });
  if (usuario) {
    usuarioCorrente = {
      id:    usuario.id,
      nome:  usuario.nome,
      login: usuario.login,
      senha: usuario.senha,
      email: usuario.email
    };
    sessionStorage.setItem("usuarioCorrente", JSON.stringify(usuarioCorrente));
    return true;
  }
  return false;
}

function logoutUser() {
  usuarioCorrente = null;
  sessionStorage.removeItem("usuarioCorrente");
  window.location.href = "modulos/login/index.html";
}

function _atualizarMenuLogin() {
  var usuario = JSON.parse(sessionStorage.getItem("usuarioCorrente"));

  var areaDesktop = document.getElementById("area-login");
  var areaMobile  = document.getElementById("area-login-mobile");

  if (areaDesktop) {
    if (usuario) {
      areaDesktop.innerHTML =
        '<span class="nav-usuario">Ol\u00e1, ' + usuario.nome + '</span>' +
        '<a href="#" class="nav-link nav-sair" id="btn-sair">Sair</a>';
    } else {
      areaDesktop.innerHTML =
        '<a href="modulos/login/index.html" class="nav-link nav-entrar">Entrar</a>';
    }
  }

  if (areaMobile) {
    if (usuario) {
      areaMobile.innerHTML =
        '<span class="nav-usuario-mobile">Ol\u00e1, ' + usuario.nome + '</span>' +
        '<a href="#" id="btn-sair-mobile">Sair</a>';
    } else {
      areaMobile.innerHTML =
        '<a href="modulos/login/index.html">Entrar</a>';
    }
  }

  var btnSair = document.getElementById("btn-sair");
  if (btnSair) {
    btnSair.addEventListener("click", function(e) {
      e.preventDefault();
      logoutUser();
    });
  }

  var btnSairMobile = document.getElementById("btn-sair-mobile");
  if (btnSairMobile) {
    btnSairMobile.addEventListener("click", function(e) {
      e.preventDefault();
      logoutUser();
    });
  }
}

document.addEventListener("DOMContentLoaded", function() {
  initLoginApp();
});
