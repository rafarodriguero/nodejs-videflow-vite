import axios from "axios";

const containerVideos = document.querySelector(".videos__container");

async function buscarEMostrarVideos() {
  const urlVideos = import.meta.env.VITE_URL_VIDEOS;

  console.log(urlVideos);

  console.log(import.meta.env.PROD);
  console.log(import.meta.env.DEV);

  try {
    //const busca = await fetch("http://localhost:3000/videos");
    const busca = await axios.get(urlVideos);
    //const videos = await busca.json();
    const videos = busca.data;

    videos.forEach((video) => {
      if (video.categoria == "") {
        throw new Error("Video não contem categoria");
      }
      containerVideos.innerHTML += `
                <li class="videos__item">
                    <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                    <div class="descricao-video">
                        <img class="img-canal" src="${video.imagem} alt="Logo do Canal">
                        <h3 class="titulo-video">${video.titulo}</h3>
                        <p class="titulo-canal">${video.descricao}</p>
                        <p class="categoria" hidden>${video.categoria}</p>
                    </div>
                </li>
                `;
    });
  } catch (error) {
    containerVideos.innerHTML = `<p> Houve um erro ao carregar os vídeos: ${error}</p>`;
  } /*finally {
        alert('Isso sempre acontece')
    }*/
}

buscarEMostrarVideos();

const barraPesquisa = document.querySelector(".pesquisar__input");

barraPesquisa.addEventListener("input", filtrarPesquisa);

function filtrarPesquisa() {
  const videos = document.querySelectorAll(".videos__item");
  const valorFiltro = barraPesquisa.value.toLowerCase();

  videos.forEach((video) => {
    const titulo = video
      .querySelector(".titulo-video")
      .textContent.toLowerCase();

    video.style.display = valorFiltro
      ? titulo.includes(valorFiltro)
        ? "block"
        : "none"
      : "block";
  });
}

const botaoCategoria = document.querySelectorAll(".superior__item");

botaoCategoria.forEach((botao) => {
  let nomeCategoria = botao.getAttribute("name");
  botao.addEventListener("click", () => filtrarPorCategoria(nomeCategoria));
});

function filtrarPorCategoria(filtro) {
  const videos = document.querySelectorAll(".videos__item");
  const valorFiltro = filtro.toLowerCase();

  videos.forEach((video) => {
    const categoria = video
      .querySelector(".categoria")
      .textContent.toLowerCase();

    if (!categoria.includes(valorFiltro) && valorFiltro != "tudo") {
      video.style.display = "none";
    } else {
      video.style.display = "block";
    }
  });
}
