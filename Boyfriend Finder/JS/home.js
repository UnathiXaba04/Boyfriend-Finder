const arrow = document.querySelector(".bouncing-arrow");


arrow.addEventListener('click', () => {
const tops = document.querySelector("article")
const more = document.querySelector(".more")

tops.style.display = "flex"
more.style.display = "block"

tops.scrollIntoView({ behavior: 'smooth' });
});