const icon = document.querySelector('.search_icon')
const box = document.querySelector('.search_box')
icon.onclick = function() {
	box.classList.toggle('active')
}