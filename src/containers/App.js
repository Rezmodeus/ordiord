import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';
import App from '../components/App';
import GameActions from '../actions/GameActions';
//import * as CounterActions from '../actions/counter';

function mapStateToProps(state) {
	return {
		gameState: state.get('gameState'),
		word: state.get('word'),
		wordStatus: state.get('wordStatus'),
		foundWords: state.get('foundWords')
	}
}

function mapDispatchToProps(dispatch) {
	return {
		toggleLetter: (index) => dispatch(GameActions.toggleLetter(index)),
		newGame: () => dispatch(GameActions.newGame()),
		checkWord: () => dispatch(GameActions.checkWord())
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)


