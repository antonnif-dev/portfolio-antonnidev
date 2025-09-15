// =======================
// Carousel de Projetos
// =======================
const track = document.querySelector('.projetosCarousel__track');
const botaoAvancar = document.getElementById('botaoAvancar');
const botaoVoltar = document.getElementById('botaoVoltar');
const itens = track ? track.children : [];

// Função para calcular largura do item
function itemLargura() {
  return itens[0].offsetWidth + 16;
}

// Funções avançar e voltar
function avancar() {
  if (track) track.scrollLeft += itemLargura();
}

function voltar() {
  if (track) track.scrollLeft -= itemLargura();
}

// Rolagem automática ao passar mouse
let intervalId = null;

function iniciarRolagem(direcao) {
  pararRolagem();
  intervalId = setInterval(() => {
    if (direcao === 'avancar') {
      avancar();
    } else {
      voltar();
    }
  }, 300);
}

function pararRolagem() {
  clearInterval(intervalId);
  intervalId = null;
}

// Eventos dos botões
if (botaoAvancar && botaoVoltar) {
  botaoAvancar.addEventListener('click', avancar);
  botaoVoltar.addEventListener('click', voltar);
  botaoAvancar.addEventListener('mouseenter', () => iniciarRolagem('avancar'));
  botaoAvancar.addEventListener('mouseleave', pararRolagem);
  botaoVoltar.addEventListener('mouseenter', () => iniciarRolagem('voltar'));
  botaoVoltar.addEventListener('mouseleave', pararRolagem);
}

// Drag-to-scroll + snap
let isDown = false, startX, scrollLeftInicial;

if (track) {
  track.addEventListener('mousedown', (e) => {
    isDown = true;
    track.classList.add('arrastando');
    startX = e.pageX - track.offsetLeft;
    scrollLeftInicial = track.scrollLeft;
  });

  track.addEventListener('mouseleave', () => {
    isDown = false;
    track.classList.remove('arrastando');
  });

  track.addEventListener('mouseup', () => {
    isDown = false;
    track.classList.remove('arrastando');
  });

  track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const deslocamento = (x - startX) * 1.5;
    track.scrollLeft = scrollLeftInicial - deslocamento;
  });
}

// =======================
// Animação de elementos (IntersectionObserver)
// =======================
const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add('animar-visivel');
    } else {
      entrada.target.classList.remove('animar-visivel');
    }
  });
}, { threshold: 0.3 });

const elementos = document.querySelectorAll('.animar');
elementos.forEach((elemento) => {
  observador.observe(elemento);
});

// =======================
// Modo Noturno / Light
// =======================
const body = document.body;
const modoSwitch = document.getElementById("modoNoturno");

// Função para aplicar tema
function aplicarTema(tema) {
  body.setAttribute("data-bs-theme", tema);
  if (modoSwitch) modoSwitch.checked = tema === "dark";
  localStorage.setItem("tema", tema);
}

// Inicializar tema salvo
const temaSalvo = localStorage.getItem("tema") || "light";
aplicarTema(temaSalvo);

// Transição suave
body.style.transition = "background-color 0.3s, color 0.3s";

// Evento do switch
if (modoSwitch) {
  modoSwitch.addEventListener("change", () => {
    const temaAtual = modoSwitch.checked ? "dark" : "light";
    aplicarTema(temaAtual);
  });
}

function carregarComponente(seletor, arquivo) {
  fetch(arquivo)
    .then(response => response.text())
    .then(data => {
      document.querySelector(seletor).innerHTML = data;
      if (seletor === '#navbar') {
        // Reaplicar toggle de tema após inserir o HTML
        const toggle = document.getElementById('modoNoturno');
        const theme = localStorage.getItem('theme') || 'light';
        document.body.setAttribute('data-bs-theme', theme);
        if (toggle) toggle.checked = theme === 'dark';

        toggle?.addEventListener('change', () => {
          const newTheme = toggle.checked ? 'dark' : 'light';
          document.body.setAttribute('data-bs-theme', newTheme);
          localStorage.setItem('theme', newTheme);
        });
      }
    })
    .catch(err => console.error(`Erro ao carregar ${arquivo}: `, err));
}

carregarComponente('#navbar', 'navbar.html');
carregarComponente('#footer', 'footer.html');