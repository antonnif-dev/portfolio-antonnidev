
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

document.querySelectorAll('.animar').forEach((el) => observador.observe(el));

// MODO NOTURNO / LIGHT


function atualizarIconeTema(tema) {
  const iconeTema = document.getElementById("iconeTema");
  if (!iconeTema) return;

  iconeTema.innerHTML = tema === "dark"
    ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
             fill="currentColor" class="size-6">
         <path fill-rule="evenodd"
          d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6
             a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69
             .75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46
             c-5.799 0-10.5-4.7-10.5-10.5
             0-4.368 2.667-8.112 6.46-9.694
             a.75.75 0 0 1 .818.162Z"
           clip-rule="evenodd" />
       </svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" fill="none"
             viewBox="0 0 24 24" stroke-width="1.5"
             stroke="currentColor" class="size-6">
         <path stroke-linecap="round" stroke-linejoin="round"
          d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189
             a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06
             0 0 1-4.5 0m3.75 2.383a14.406 14.406
             0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823
             1.508-2.316a7.5 7.5 0 1 0-7.517 0
             c.85.493 1.509 1.333 1.509 2.316V18" />
       </svg>`;
}

// Seleção dos botões
document.getElementById("temaLight")?.addEventListener("click", () => aplicarTema("light"));
document.getElementById("temaDark")?.addEventListener("click", () => aplicarTema("dark"));

/*
// Função principal (mantém aplicarTema já existente)
function atualizarIcones(tema) {
  if (!botaoLight || !botaoDark) return;
  if (tema === "dark") {
    botaoDark.classList.add("oculto");
    botaoLight.classList.remove("oculto");
  } else {
    botaoLight.classList.add("oculto");
    botaoDark.classList.remove("oculto");
  }
}
*/

function atualizarIcones(tema) {
  const botaoLight = document.getElementById("temaLight");
  const botaoDark = document.getElementById("temaDark");
  if (!botaoLight || !botaoDark) return;

  if (tema === "dark") {
    botaoDark.classList.add("oculto");
    botaoLight.classList.remove("oculto");
  } else {
    botaoLight.classList.add("oculto");
    botaoDark.classList.remove("oculto");
  }
}

function aplicarTema(tema) {
  document.body.setAttribute("data-bs-theme", tema);
  localStorage.setItem("tema", tema);
  atualizarIcones(tema);
}

// Inicializa tema salvo
const temaSalvo = localStorage.getItem("tema") || "light";
aplicarTema(temaSalvo);

// Eventos de clique nos botões
document.addEventListener("click", (e) => {
  if (e.target.closest("#temaLight")) aplicarTema("light");
  if (e.target.closest("#temaDark")) aplicarTema("dark");
});

// Transição suave
document.body.style.transition = "background-color 0.3s, color 0.3s";

// CARREGAR COMPONENTES DINÂMICOS (Navbar/Footer)

function carregarComponente(seletor, arquivo) {
  fetch(arquivo)
    .then(res => res.text())
    .then(data => {
      document.querySelector(seletor).innerHTML = data;
      if (seletor === '#navbar') {
        const toggle = document.getElementById('modoNoturno');
        const tema = localStorage.getItem('tema') || 'light';
        aplicarTema(tema);
        document.body.setAttribute('data-bs-theme', tema);
        if (toggle) toggle.checked = tema === 'dark';
        atualizarIconeTema(tema);

        toggle?.addEventListener('change', () => {
          const novoTema = toggle.checked ? 'dark' : 'light';
          aplicarTema(novoTema);
        });
      }
    })
    .catch(err => console.error(`Erro ao carregar ${arquivo}: `, err));
}

carregarComponente('#navbar', 'navbar.html');
carregarComponente('#footer', 'footer.html');
