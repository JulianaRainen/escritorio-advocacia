const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const year = document.querySelector("[data-year]");
const form = document.querySelector("[data-contact-form]");
const formNote = document.querySelector("[data-form-note]");

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 20);
};

year.textContent = new Date().getFullYear();
updateHeader();

window.addEventListener("scroll", updateHeader, { passive: true });

navToggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("is-open");
  navToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
});

nav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    header.classList.remove("is-open");
    navToggle.setAttribute("aria-label", "Abrir menu");
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const message = [
    `Nome: ${data.get("nome")}`,
    `E-mail: ${data.get("email")}`,
    `Área: ${data.get("area")}`,
    "",
    data.get("mensagem"),
  ].join("\n");

  formNote.textContent = "Mensagem preparada. Antes de publicar, conecte este formulário ao e-mail ou WhatsApp oficial.";

  if (navigator.clipboard) {
    navigator.clipboard.writeText(message).catch(() => {});
  }
});
