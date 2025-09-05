const track = document.querySelector('.projetosCarousel__track');
const botaoAvancar = document.getElementById('botaoAvancar');
const botaoVoltar = document.getElementById('botaoVoltar');
const itens = track.children;

function itemLargura() {
  return itens[0].offsetWidth + 16;
}

function avancar() {
  track.scrollLeft += itemLargura();
}

function voltar() {
  track.scrollLeft -= itemLargura();
}

let intervalId = null;

function iniciarRolagem(direcao) {
  pararRolagem();
  intervalId = setInterval(() => {
    if (direcao === 'avancar') {
      track.scrollLeft += itemLargura();
    } else {
      track.scrollLeft -= itemLargura();
    }
  }, 300);
}

function pararRolagem() {
  clearInterval(intervalId);
  intervalId = null;
}

botaoAvancar.addEventListener('click', avancar);
botaoVoltar.addEventListener('click', voltar);
botaoAvancar.addEventListener('mouseenter', () => iniciarRolagem('avancar'));
botaoAvancar.addEventListener('mouseleave', pararRolagem);
botaoVoltar.addEventListener('mouseenter', () => iniciarRolagem('voltar'));
botaoVoltar.addEventListener('mouseleave', pararRolagem);

// Drag-to-scroll + snap
let isDown = false, startX, scrollLeftInicial;

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

// Efeito animar css
const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add('animar-visivel');
    } else {
      entrada.target.classList.remove('animar-visivel');
    }
  });
}, {
  threshold: 0.3
});

const elementos = document.querySelectorAll('.animar');
elementos.forEach((elemento) => {
  observador.observe(elemento);
});

// Modo noturno

const body = document.body;
const modoNoturno = document.getElementById('modoNoturno');

modoNoturno.addEventListener('change', () => {
 if (modoNoturno.checked) {
    body.setAttribute('data-bs-theme', 'dark');
  } else {
    body.setAttribute('data-bs-theme', 'light');
  }
});
