export default {
	toggleLetter (index) {
		return({
			type:'TOGGLE_LETTER',
			index
		})
	},

	newGame(){
		return({
			type:'NEW_GAME'
		})
	},

	checkWord(){
		return({
			type:'CHECK_WORD'
		})
	}

}
