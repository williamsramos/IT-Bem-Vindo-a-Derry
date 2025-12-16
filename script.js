// Liberar som do trailer
function unmuteYT() {
  const iframe = document.getElementById('trailer');
  iframe.src = iframe.src.replace('mute=1','mute=0');
}

const timerEl = document.getElementById("timer");
const mensagemEl = document.getElementById("mensagemFinal");
const episodioTituloEl = document.getElementById("episodioTitulo");

// Lista de episódios
const episodios = [
  // Temporada 1
  { titulo: "Episódio 2 - Temp 1", data: "2025-10-31T22:00:00" },
  { titulo: "Episódio 3 - Temp 1", data: "2025-11-09T22:00:00" },
  { titulo: "Episódio 4 - Temp 1", data: "2025-11-16T22:00:00" },
  { titulo: "Episódio 5 - Neibolt Street  - Temp 1", data: "2025-11-23T22:00:00" },
  { titulo: "Episódio 6 - In the Name of the Father - Temp 1", data: "2025-11-30T22:00:00" },
  { titulo: "Episódio 7 - Black Spot - Temp 1", data: "2025-12-07T22:00:00" },
  { titulo: "Episódio 8 - Winter Fire (Final)- Temp 1", data: "2025-12-14T22:00:00" },
 

  // Temporada 2 (datas fictícias, ajuste conforme necessário)
  //{ titulo: "Episódio 1 - Temp 2", data: "2026-01-04T22:00:00" },
 // { titulo: "Episódio 2 - Temp 2", data: "2026-01-11T22:00:00" },
  //{ titulo: "Episódio 3 - Temp 2", data: "2026-01-18T22:00:00" },
  //{ titulo: "Episódio 4 - Temp 2", data: "2026-01-25T22:00:00" },
 // { titulo: "Episódio 5 - Temp 2", data: "2026-02-01T22:00:00" },
 // { titulo: "Episódio 6 - Temp 2", data: "2026-02-08T22:00:00" },
 // { titulo: "Episódio 7 - Temp 2", data: "2026-02-15T22:00:00" },
  //{ titulo: "Episódio 8 - Temp 2", data: "2026-02-22T22:00:00" }
];

let indiceAtual = 0;
let intervalo = null;

function iniciarEpisodio(indice) {
  if (indice >= episodios.length) {
    episodioTituloEl.textContent = "Novos episódios em breve...";
    timerEl.style.display = "none";
    mensagemEl.style.display = "block";
    mensagemEl.textContent = "🎬 Fim da primeira temporada 🎈";
    mensagemEl.textContent = "🎬 Em breve nova temporada de It welcome to Derry 🎈";
    return;
  }

  const ep = episodios[indice];
  const alvo = new Date(ep.data);

  episodioTituloEl.textContent = `Próximo episódio: ${ep.titulo} — ${alvo.toLocaleString("pt-BR")}`;
  mensagemEl.style.display = "none";
  timerEl.style.display = "block";

  if (intervalo) clearInterval(intervalo);

  function atualizarTimer() {
    const agora = new Date();
    const diferenca = alvo - agora;

    if (diferenca <= 0) {
      timerEl.style.display = "none";
      mensagemEl.style.display = "block";
      mensagemEl.textContent = `🎈 ${ep.titulo} começou! 🎬`;

      clearInterval(intervalo);

      setTimeout(() => {
        iniciarEpisodio(indice + 1);
      }, 5000);

      return;
    }

    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diferenca / (1000 * 60)) % 60);
    const segundos = Math.floor((diferenca / 1000) % 60);

    timerEl.textContent = `${dias}d ${String(horas).padStart(2,"0")}:${String(minutos).padStart(2,"0")}:${String(segundos).padStart(2,"0")}`;
  }

  atualizarTimer();
  intervalo = setInterval(atualizarTimer, 1000);
}

// Encontrar o primeiro episódio futuro
while (indiceAtual < episodios.length && new Date(episodios[indiceAtual].data) <= new Date()) {
  indiceAtual++;
}

iniciarEpisodio(indiceAtual);





