import React, { Component, AppRegistry } from 'react-native';
import { Provider } from 'react-redux/native';
import App from './containers/App';
import configureStore from './configureStore';

const store = configureStore();

class OrdIOrd extends Component {
  render() {
    return (
      <Provider store={store}>
        {() => <App />}
      </Provider>
    );
  }
}

AppRegistry.registerComponent('OrdIOrd', () => OrdIOrd);
