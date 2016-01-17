import immutable from 'immutable';
import dictionary from '../Dictionary';
export default function(state, action){
	let word;
	switch(action.type) {
		case 'TOGGLE_LETTER':
			return state.updateIn(['wordStatus',action.index],n => !n);
		case 'CHECK_WORD':
			word = state.get('word');
			let newWord = state.get('wordStatus').entrySeq().map( ([index,status]) => {
				if (!status) {
					return word.charAt(index)
				}
			}).toJS().join('').toLowerCase();
			let uppercaseWord = newWord.toUpperCase();
			if (newWord && !state.hasIn(['foundWords',uppercaseWord]) && dictionary.isWord(newWord)){
				let list = state.get('foundWords');
				list = list.push(uppercaseWord);
				state = state.set('foundWords',list);
			}
			state = state.set('wordStatus',immutable.fromJS(Array(word.length).fill(true)));

			return state;
		case 'NEW_GAME':
			word = dictionary.getNewWord();
			state = state.set('word',word.toUpperCase());
			state = state.set('wordStatus',immutable.fromJS(Array(word.length).fill(true)));
			state = state.set('foundWords',immutable.List());
			return state;
		default:
			return state;
	}

}
