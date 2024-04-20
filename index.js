const labels = document.querySelectorAll('label')
const copy_btns = document.querySelectorAll('.copy')

document.addEventListener('keypress', e => {
	generateColor()
})
function generateColor() {
	for (const label of labels) {
		let color = '#' + Math.random().toString(16).substr(6, 6)
		document.body.style.backgroundImage = `linear-gradient(to bottom, rgba(${parseInt(
			color.slice(1, 3),
			16
		)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(
			color.slice(5, 7),
			16
		)}, 0.3), rgba(248, 245, 245, 0.3))`
		label.style.backgroundColor = color
		label.querySelector('.color-value').innerText = color

		const color_picker = label.nextElementSibling
		color_picker.value = color

		color_picker.oninput = function () {
			this.previousElementSibling.style.backgroundColor = this.value
			this.previousElementSibling.querySelector('p').innerText = this.value
		} //зберігати значення колор1 з колорпікера
	}
}

for (const copy_btn of copy_btns) {
	copy_btn.onclick = () => {
		copy_btn.innerText = 'copied'
		setTimeout(() => {
			copy_btn.innerText = 'copy'
		}, 1500)

		const color_code = copy_btn.nextElementSibling.innerText //поправити

		navigator.clipboard.writeText(color_code)
	}
}
