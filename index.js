document.addEventListener('DOMContentLoaded', () => {
let color3 = '#f3f3f3'
	let colorValue
	function updateGradient(color1, color2) {
		document.body.style.backgroundImage = `linear-gradient(to bottom, ${color1}60, ${color2})`
	}

	function updateColorPicker1(label) {

		updateColorPicker3(label)

		const colorInput = label.querySelector('input[type="color"]')

		colorInput.addEventListener('input', () => {
			const colorValue = colorInput.value

			console.log('New color selected for palette 1:', colorValue)

			label.style.backgroundColor = colorValue
			label.querySelector('.color-value').innerText = colorValue
			if (label.parentElement.classList.contains('generated-color1')) {
				updateGradient(colorValue, color3)

								document.body.style.backgroundImage = `linear-gradient(to bottom, ${colorValue}60, 'red')`

				const signUpForm = document.querySelector('.sign-up-form')
				signUpForm.style.background = `radial-gradient(circle 400px at left, ${colorValue}60, transparent),		radial-gradient(circle 400px at right top, ${colorValue}80, transparent),		radial-gradient(circle 400px at right bottom, ${colorValue}70, transparent)`

				const colors = document.querySelectorAll('.color')
				const baseHSL = hslFromHex(colorValue)
				const baseHue = baseHSL[0]
				const baseSaturation = baseHSL[1] + 20
				const baseLightness = baseHSL[2] + 40
				const lightnessStep = 75 / 10

				colors.forEach((colorElement, index) => {
					if (index < 12) {
						const lightness = baseLightness - index * lightnessStep
						colorElement.style.backgroundColor = `hsl(${baseHue}, ${baseSaturation}%, ${lightness}%)`
					}
				})
			}

			const copyBtns = document.querySelectorAll('button')
			const colorInput12 = document.querySelector('input[type="color"]')
			const colorValue12 = colorInput12.value

			const checkbox = document.querySelectorAll('input[type="checkbox"]')

			checkbox.forEach(checkbox => {
				checkbox.style.accentColor = colorValue12
			})

			const radioOptions = document.querySelectorAll('.radio-option')

			function setBorderColorForAll(color) {
				radioOptions.forEach(option => {
					option.nextElementSibling.style.borderColor = color
				})
			}
			radioOptions.forEach(radioOption => {
				radioOption.addEventListener('change', function () {
					setBorderColorForAll('#dedede')

					if (this.checked) {
						this.nextElementSibling.style.borderColor = colorValue12
					}
				})

			})

			copyBtns.forEach(copyBtn => {
				copyBtn.style.backgroundColor = colorValue12
			})

			const userColor = document.querySelectorAll('.user-images-color')

			userColor.forEach(userColor => {
				userColor.style.backgroundColor = `${colorValue12}90`
			})

			const error = document.querySelector('.error')

			error.style.backgroundColor = `${colorValue12}40`

			document.querySelector('.error-text').style.color = colorValue12

			const chekboxesA = document.querySelectorAll('.chekboxes a , .text1 a')

			chekboxesA.forEach(chekboxesA => {
				chekboxesA.style.color = colorValue12
			})

			document.querySelector('.text1').style.borderColor = `${colorValue12}60`
		})
	}

	function updateColorPicker2(label) {
		const colorInput = label.querySelector('input[type="color"]')

		colorInput.addEventListener('input', () => {
			const colorValue = colorInput.value

			label.style.backgroundColor = colorValue
			label.querySelector('.color-value').innerText = colorValue

			const color2 = document.getElementById('color2').value

			if (label.parentElement.classList.contains('generated-color2')) {
				const colors_gray = document.querySelectorAll('.color_gray')
				const baseHSL_gray = hslFromHex(color2)
				const baseHue_gray = baseHSL_gray[0]
				const baseSaturation_gray = baseHSL_gray[1]
				const baseLightness_gray = baseHSL_gray[2] + 40
				const lightnessStep_gray = 70 / 10

				colors_gray.forEach((colorElement, index) => {
					if (index < 12) {
						const lightness_gray =
							baseLightness_gray - index * lightnessStep_gray
						colorElement.style.backgroundColor = `hsl(${baseHue_gray}, ${baseSaturation_gray}%, ${lightness_gray}%)`
					}
				})

				const userGray = document.querySelectorAll('.user-images-gray')

				userGray.forEach(userGray => {
					userGray.style.backgroundColor = color2
				})

				const textA = document.querySelectorAll(' .text2 a')
				textA.forEach(textA => {
					textA.style.color = color2
				})
				document.querySelector('.text2').style.borderColor = `${color2}60`
			}
		})
	}

	function updateColorPicker3(label) {
		const colorInput = label.querySelector('input[type="color"]')

		colorInput.addEventListener('input', () => {
			const colorValue = colorInput.value

			label.style.backgroundColor = colorValue
			label.querySelector('.color-value').innerText = colorValue

			color3 = document.getElementById('color3').value

			if (label.parentElement.classList.contains('generated-color3')) {
				document.body.style.backgroundColor = color3
				updateGradient(colorValue, color3)
			}
							updateGradient(colorValue, color3)

		})
						updateGradient(colorValue, color3)

	}
	document.querySelectorAll('.generated-colors label').forEach(label => {
				updateColorPicker3(label)

		updateColorPicker1(label)
		updateColorPicker2(label)
	})

	function hslFromHex(hex) {
		const r = parseInt(hex.substring(1, 3), 16) / 255
		const g = parseInt(hex.substring(3, 5), 16) / 255
		const b = parseInt(hex.substring(5, 7), 16) / 255

		const max = Math.max(r, g, b)
		const min = Math.min(r, g, b)

		let h,
			s,
			l = (max + min) / 2

		if (max === min) {
			h = s = 0
		} else {
			const d = max - min
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

			switch (max) {
				case r:
					h = (g - b) / d + (g < b ? 6 : 0)
					break
				case g:
					h = (b - r) / d + 2
					break
				case b:
					h = (r - g) / d + 4
					break
			}
			h *= 60
		}

		return [Math.round(h), Math.round(s * 100), Math.round(l * 100)]
	}

	function generateColor() {
		document
			.querySelectorAll('.generated-color1 label')
			.forEach(label => {
				let color = '#' + Math.random().toString(16).substring(2, 8)

				label.style.backgroundColor = color

				const colorInput = label.querySelector('input[type="color"]')
				if (colorInput) {
					colorInput.value = color
					colorInput.dispatchEvent(new Event('input'))
				}
			})
	}

	function generateColor3() {
		document
			.querySelectorAll(' .generated-color3 label')
			.forEach(label => {
				let color = '#f3f3f3'

				label.style.backgroundColor = color

				const colorInput = label.querySelector('input[type="color"]')
				if (colorInput) {
					colorInput.value = color
					colorInput.dispatchEvent(new Event('input'))
				}
			})
	}

	gray()
	generateColor()
generateColor3()


	function gray() {
		document.querySelectorAll('.generated-color2 label').forEach(label => {
			let color = '#' + 'a3a3a3'

			label.style.backgroundColor = color

			const colorInput = label.querySelector('input[type="color"]')
			if (colorInput) {
				colorInput.value = color
				colorInput.dispatchEvent(new Event('input'))
			}
		})
	}
updateGradient(colorValue, color3)

	document.addEventListener('keydown', e => {
		if (e.code === 'Space') {
			e.preventDefault()
updateGradient(colorValue, color3)
			generateColor()
		}
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

	document.querySelectorAll('.color').forEach(copyBtn => {
		copyBtn.addEventListener('click', () => {
			const colorCode = copyBtn.previousElementSibling.textContent
			navigator.clipboard
				.writeText(colorCode)
				.then(() => {
					copyBtn.innerText = 'Copied'
					copyBtn.style.color = '#0f0d0db9'
					copyBtn.style.fontWeight = '500'

					setTimeout(() => {
						copyBtn.innerText = ''
					}, 1000)
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
