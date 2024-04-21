document.addEventListener('DOMContentLoaded', () => {
	function updateColorPicker(label) {

		const colorInput = label.querySelector('input[type="color"]')

		colorInput.addEventListener('input', () => {
			const colorValue = colorInput.value

			console.log('New color selected:', colorValue)

			label.style.backgroundColor = colorValue
			label.querySelector('.color-value').innerText = colorValue

			if (label.parentElement.classList.contains('generated-color1')) {
				document.body.style.backgroundImage = `linear-gradient(to bottom, ${colorValue}60, #f8f5f5)`

				const colors = document.querySelectorAll('.color')
				const baseHue = hueFromHex(colorValue)
				const baseSaturation = 150
				const baseLightness = 90
				const lightnessStep = 75 / 10

				const colors_gray = document.querySelectorAll('.color_gray')
				const baseSaturation_gray = 0
				const baseLightness_gray = 90
				const lightnessStep_gray = 70 / 10

				const baseColor = {
					hue: baseHue,
					saturation: baseSaturation,
					lightness: baseLightness,
				}

				const baseColor_gray = {
					hue: baseHue,
					saturation: baseSaturation_gray,
					lightness: baseLightness_gray,
				}

				colors.forEach((colorElement, index) => {
					if (index < 12) {
						const lightness = baseLightness - index * lightnessStep
						const newColor = calculateColor(baseColor, lightness)
						colorElement.style.backgroundColor = `hsl(${newColor.hue}, ${newColor.saturation}%, ${newColor.lightness}%)`
					}
				})

				colors_gray.forEach((colorElement, index) => {
					if (index < 12) {
						const lightness_gray =
							baseLightness_gray - index * lightnessStep_gray
						const newColor = calculateColor(baseColor_gray, lightness_gray)
						colorElement.style.backgroundColor = `hsl(${newColor.hue}, ${newColor.saturation}%, ${newColor.lightness}%)`
					}
				})
			}

			console.log('Label background color updated to:', colorValue)
		})
	}

	function hueFromHex(hex) {
		const r = parseInt(hex.substring(1, 3), 16)
		const g = parseInt(hex.substring(3, 5), 16)
		const b = parseInt(hex.substring(5, 7), 16)
		const max = Math.max(r, g, b)
		const min = Math.min(r, g, b)
		let hue
		if (max === min) {
			hue = 0
		} else {
			switch (max) {
				case r:
					hue = (g - b) / (max - min) + (g < b ? 6 : 0)
					break
				case g:
					hue = (b - r) / (max - min) + 2
					break
				case b:
					hue = (r - g) / (max - min) + 4
					break
			}
			hue *= 60
		}
		return Math.round(hue)
	}

	function calculateColor(baseColor, lightness) {
		return {
			hue: baseColor.hue,
			saturation: baseColor.saturation,
			lightness: lightness,
		}
	}

	document.querySelectorAll('.generated-colors label').forEach(label => {
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
generateColor()
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

	const colorPickerContainers = document.querySelectorAll(
		'.generated-colors .generated-color'
	)
	colorPickerContainers.forEach(container => {
		const colorInput = container.querySelector('input[type="color"]')
		colorInput.addEventListener('change', event => {
			const colorValue = event.target.value
			container.style.setProperty(
				'--radix-color-picker-selected-color',
				colorValue
			)
		})
	})
})
