const validateDate = function(date) {
	const valide = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/.test(date)
	//TODO: Terminar validação de data e importar na tela de cadastro da nota
}

const validateTime24 = function(time) {
	return /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/.test(time)
}

console.log(validateTime24("24:59"));