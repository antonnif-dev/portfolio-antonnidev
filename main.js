
// CARROSSEL PRINCIPAL (Horizontal)

const track = document.querySelector('.projetosCarousel__track');
const botaoAvancar = document.getElementById('botaoAvancar');
const botaoVoltar = document.getElementById('botaoVoltar');
const itens = track ? Array.from(track.children) : [];

// Embaralhar itens (Fisher-Yates)
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

// Funções utilitárias
function itemLargura() {
  return itens[0].offsetWidth + 16;
}
function avancar() {
  if (track) track.scrollLeft += itemLargura();
}
function voltar() {
  if (track) track.scrollLeft -= itemLargura();
}

// Rolagem automática ao passar o mouse
let intervalId = null;
function iniciarRolagem(direcao) {
  pararRolagem();
  intervalId = setInterval(() => {
    direcao === 'avancar' ? avancar() : voltar();
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

// Drag horizontal (scroll suave)
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

// CARROSSEL VERTICAL (Modal)

const trackModal = document.querySelector('.projetosCarouselModal__track');
const botaoModalAvancar = document.querySelector('.botaoModalAvancar');
const botaoModalVoltar = document.querySelector('.botaoModalVoltar');
const itensModal = trackModal ? Array.from(trackModal.children) : [];

function itemAlturaModal() {
  return itensModal[0].offsetHeight + 12;
}
function avancarModal() {
  if (trackModal) trackModal.scrollTop += itemAlturaModal();
}
function voltarModal() {
  if (trackModal) trackModal.scrollTop -= itemAlturaModal();
}

if (botaoModalAvancar && botaoModalVoltar) {
  botaoModalAvancar.addEventListener('click', avancarModal);
  botaoModalVoltar.addEventListener('click', voltarModal);
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

// ANIMAÇÃO DE ELEMENTOS (IntersectionObserver)

const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    entrada.target.classList.toggle('animar-visivel', entrada.isIntersecting);
  });
}, { threshold: 0.3 });

const elementos = document.querySelectorAll('.animar');
elementos.forEach((elemento) => {
  observador.observe(elemento);
});

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
body.style.transition = "background-color 0.3s, color 0.3s";
aplicarTema(temaSalvo);

// Eventos de clique nos botões
document.addEventListener("click", (e) => {
  if (e.target.closest("#temaLight")) aplicarTema("light");
  if (e.target.closest("#temaDark")) aplicarTema("dark");
});

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
      const container = document.querySelector(seletor);
      if (!container) throw new Error(`Seletor ${seletor} não encontrado`);
      container.innerHTML = data;

      // Se for o navbar, reaplique o controle de tema e conecte o botão
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
    .catch(err => console.error(`Erro ao carregar ${arquivo}:`, err));
}

// Carrega navbar e footer
carregarComponente('#navbar', 'navbar.html');
carregarComponente('#footer', 'footer.html');
