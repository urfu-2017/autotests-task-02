module.exports = function formatDate(date) {
	const array = date.match(/\d+/g);
	const dateNow = new Date();
	const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
	const numberOfDayes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	if (array[0] > dateNow.getFullYear()) {
		throw new Error('Future year');
	}
	if ((array[0] == dateNow.getFullYear()) && (parseInt(array[1]) > dateNow.getMonth()+1)) {
		throw new Error('Future month');
	}
	if ((array[0] == dateNow.getFullYear()) && (parseInt(array[1]) == dateNow.getMonth()+1) && (parseInt(array[2]) > dateNow.getDate())) {
		throw new Error('Future day');
	}
	if (parseInt(array[3]) > 24) {
		throw new Error('Incorrect hours');
	}
	if (parseInt(array[4]) > 60) {
		throw new Error('Incorrect minutes');
	}
	if (parseInt(array[2]) > numberOfDayes[parseInt(array[1]-1)]) {
		throw new Error('non-existent date');
	}
	if (array[0] == dateNow.getFullYear() && dateNow.getMonth()+1 == parseInt(array[1])){
		if (parseInt(array[2]) == dateNow.getDate()) {
			return array[3]+":"+array[4];
		}
		else if (parseInt(array[2]) == dateNow.getDate()-1) {
			return "вчера в "+array[3]+":"+array[4];
		}
	}
	if (array[0] == dateNow.getFullYear()) {
		return parseInt(array[2])+" "+months[parseInt(array[1])-1]+" в "+array[3]+":"+array[4];
	}
		else return parseInt(array[2])+" "+months[parseInt(array[1])-1]+" "+array[0]+" года"+" в "+array[3]+":"+array[4];
};


