const modalOverlay = document.querySelector(".modal-overlay");
const cards = document.querySelectorAll(".card");

for (let card of cards) {
  card.addEventListener("click", function () {
    const videoId = card.getAttribute("id");
    // no click ir para a página
    window.location.href = `/video?id=${videoId}`;
  });
}
