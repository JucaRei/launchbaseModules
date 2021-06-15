const modalOverlay = document.querySelector(".modal-overlay");
const cards = document.querySelectorAll(".card");

for (let card of cards) {
  // escuta o evento click
  card.addEventListener("click", function () {
    const videoId = card.getAttribute("id");
    modalOverlay.classList.add("active");
    modalOverlay.querySelector(
      "iframe"
    ).src = `https:/www.youtube.com/embed/${videoId}`;
  });
}

// botão fechar
document.querySelector(".close-modal").addEventListener("click", function () {
  modalOverlay.classList.remove("active");
  // quando fechar a janela, fecha o video
  modalOverlay.querySelector("iframe").src = "";
});
