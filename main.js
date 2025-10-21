const track = document.querySelector('.projetosCarousel__track');
const botaoAvancar = document.getElementById('botaoAvancar');
const botaoVoltar = document.getElementById('botaoVoltar');
const itens = track ? Array.from(track.children) : [];

// ======== CARROSSEL VERTICAL (Modal) ========

const trackModal = document.querySelector('.projetosCarouselModal__track');
const botaoModalAvancar = document.querySelector('.botaoModalAvancar');
const botaoModalVoltar = document.querySelector('.botaoModalVoltar');
const itensModal = trackModal ? Array.from(trackModal.children) : [];

function itemAlturaModal() {
  return itensModal[0].offsetHeight + 12; // altura + gap
}

function avancarModal() {
  if (trackModal) trackModal.scrollTop += itemAlturaModal();
}

function voltarModal() {
  if (trackModal) trackModal.scrollTop -= itemAlturaModal();
}

// Botões
if (botaoModalAvancar && botaoModalVoltar) {
  botaoModalAvancar.addEventListener('click', () => {
    avancarModal();
  });
  botaoModalVoltar.addEventListener('click', () => {
    voltarModal();
  });
}

// Drag vertical
let isDownModal = false, startYModal, scrollTopInicialModal;

if (trackModal) {
  trackModal.addEventListener('mousedown', (e) => {
    isDownModal = true;
    trackModal.classList.add('arrastando');
    startYModal = e.pageY - trackModal.offsetTop;
    scrollTopInicialModal = trackModal.scrollTop;
  });

  trackModal.addEventListener('mouseleave', () => {
    isDownModal = false;
    trackModal.classList.remove('arrastando');
  });

  trackModal.addEventListener('mouseup', () => {
    isDownModal = false;
    trackModal.classList.remove('arrastando');
  });

  trackModal.addEventListener('mousemove', (e) => {
    if (!isDownModal) return;
    e.preventDefault();
    const y = e.pageY - trackModal.offsetTop;
    const deslocamento = (y - startYModal) * 1.5;
    trackModal.scrollTop = scrollTopInicialModal - deslocamento;
  });
}


// Função para embaralhar (Fisher-Yates)
function embaralhar(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Deixar os itens do carrossel de forma aleatória
if (track && itens.length > 0) {
  const itensEmbaralhados = embaralhar(itens);
  track.innerHTML = "";
  itensEmbaralhados.forEach(item => track.appendChild(item));
}

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
  botaoAvancar.addEventListener('mouseenter', () =>
    iniciarRolagem('avancar'));
  botaoAvancar.addEventListener('mouseleave', pararRolagem);
  botaoVoltar.addEventListener('mouseenter', () =>
    iniciarRolagem('voltar'));
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

// Animação de elementos (IntersectionObserver)
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
});/*
// Modo Noturno / Light
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
*/

// ======== MODO NOTURNO / LIGHT ========
const body = document.body;

// Função para aplicar tema e ajustar ícones (recebe elementos opcionais)
function aplicarTema(tema, { iconSun, iconMoon } = {}) {
  body.setAttribute("data-bs-theme", tema);
  localStorage.setItem("tema", tema);

  if (iconSun) iconSun.style.display = tema === "dark" ? "none" : "inline";
  if (iconMoon) iconMoon.style.display = tema === "dark" ? "inline" : "none";
}

// Inicializar tema salvo (sem depender de elementos ainda)
const temaSalvo = localStorage.getItem("tema") || "light";
body.style.transition = "background-color 0.3s, color 0.3s";
aplicarTema(temaSalvo);

// ======== CARREGAR COMPONENTES (ex.: navbar + footer) ========
function carregarComponente(seletor, arquivo) {
  fetch(arquivo)
    .then(response => {
      if (!response.ok) throw new Error(`Erro ${response.status}`);
      return response.text();
    })
    .then(data => {
      const container = document.querySelector(seletor);
      if (!container) throw new Error(`Seletor ${seletor} não encontrado`);
      container.innerHTML = data;

      // Se for o navbar, reaplique o controle de tema e conecte o botão
      if (seletor === '#navbar') {
        const btnToggleLocal = document.getElementById("toggleTheme");
        const iconSunLocal = document.getElementById("iconSun");
        const iconMoonLocal = document.getElementById("iconMoon");

        // Aplica o tema atual e atualiza os ícones (passa referências)
        const temaAtual = localStorage.getItem("tema") || "light";
        aplicarTema(temaAtual, { iconSun: iconSunLocal, iconMoon: iconMoonLocal });

        // Registra o evento de clique no botão (se existir)
        if (btnToggleLocal) {
          btnToggleLocal.addEventListener("click", () => {
            const novoTema = body.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
            aplicarTema(novoTema, { iconSun: iconSunLocal, iconMoon: iconMoonLocal });
          });
        }
      }
    })
    .catch(err => console.error(`Erro ao carregar ${arquivo}: `, err));
}

// Carrega navbar e footer
carregarComponente('#navbar', 'navbar.html');
carregarComponente('#footer', 'footer.html');
