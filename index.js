document.addEventListener('DOMContentLoaded', () => {
	function updateColorPicker(label) {
		console.log('Updating color picker for label:', label)

		const colorInput = label.querySelector('input[type="color"]')

		colorInput.addEventListener('input', () => {
			const colorValue = colorInput.value

			console.log('New color selected:', colorValue)

			label.style.backgroundColor = colorValue
      label.querySelector('.color-value').innerText = colorValue

			if (label === document.querySelector('.generated-colors label')) {
				document.body.style.backgroundImage = `linear-gradient(to bottom, ${colorValue}60, #f8f5f5)`
			}

			console.log('Label background color updated to:', colorValue)
		})
	}

	document.querySelectorAll('.generated-colors label').forEach(label => {
		console.log('Label found:', label)
		updateColorPicker(label) 
	})

	function generateColor() {
		document.querySelectorAll('.generated-color1 label').forEach(label => {
			let color = '#' + Math.random().toString(16).substring(2, 8)

			label.style.backgroundColor = color

			const colorInput = label.querySelector('input[type="color"]')
			if (colorInput) {
				colorInput.value = color

				colorInput.dispatchEvent(new Event('input'))
			}
		})
	}

	document.addEventListener('keypress', e => {
		generateColor()
	})

	document.querySelectorAll('.copy').forEach(copyBtn => {
		copyBtn.addEventListener('click', () => {
			const colorCode = copyBtn.previousElementSibling.textContent
			navigator.clipboard
				.writeText(colorCode)
				.then(() => {
					copyBtn.innerText = 'Copied'
					setTimeout(() => {
						copyBtn.innerText = 'Copy'
					}, 1500)
				})
				.catch(err => console.error('Failed to copy: ', err))
		})
	})
})
