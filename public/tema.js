function inicializarTema() {
  const body = document.body;
  const botaoLight = document.getElementById("temaLight");
  const botaoDark = document.getElementById("temaDark");

  if (!botaoLight || !botaoDark) {
    console.warn("Ícones de tema não encontrados no DOM.");
    return;
  }

  const aplicarTema = (tema) => {
    body.setAttribute("data-bs-theme", tema);
    localStorage.setItem("tema", tema);
    botaoLight.classList.toggle("ativo", tema === "light");
    botaoDark.classList.toggle("ativo", tema === "dark");
  };
  
  aplicarTema(localStorage.getItem("tema") || "light");
  botaoLight.onclick = () => aplicarTema("dark");
  botaoDark.onclick = () => aplicarTema("light");
}

window.inicializarTema = inicializarTema;