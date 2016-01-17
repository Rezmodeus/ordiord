let wordList = [];

function compare(origWord,index){
	let i = 0;
	const word = wordList[index]
	while(i < origWord.length && i < word.length){
		if(origWord.charAt(i) != word.charAt(i)){
			return word.charCodeAt(i) - origWord.charCodeAt(i);
		}
		i++;
	}
	if (origWord.length > word.length){
		return 1;
	} else if (origWord.length < word.length){
		return -1;
	} else {
		return 0;
	}

}

function findWordIndex(word) {

	let minIndex = 0;
	let maxIndex = wordList.length - 1;
	let currentIndex;

	while (minIndex <= maxIndex) {
		currentIndex = (minIndex + maxIndex) / 2 | 0;
		let diff = compare(word, currentIndex);

		if (diff < 0) {
			minIndex = currentIndex + 1;
		}
		else if (diff > 0) {
			maxIndex = currentIndex - 1;
		}
		else {
			return currentIndex;
		}
	}

	return -1;
}
function getDecompressed(compressedWords){
	const reg = /\d+/;
	let prevWord = '';
	return compressedWords.map( word => {
		const result = word.match(reg);
		let newWord = '';
		if (result == null){
			newWord = prevWord + word;
		} else {
			newWord = prevWord.substr(0, parseInt(result[0])) + word.substr(result[0].length);
		}
		prevWord = newWord;
		return newWord
	});
}

function getCompressed(words) {
	let prevWord = '';
	return words.map( word => {
		let i = 0;
		while (i < prevWord.length && i < word.length && prevWord[i] == word[i]) {
			i++;
		}
		const repeatStr = word.substr(0,i) == prevWord && i > 0 ? '' : i;
		prevWord = word;
		return repeatStr + word.substr(i);
	});
}

export default {
	getNewWord(){
		return wordList[Math.floor(Math.random()*wordList.length)];
	},
	isWord (word){
		return findWordIndex(word) != -1
	},

	getDecompressed:getDecompressed,
	getCompressed:getCompressed
}

