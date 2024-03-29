import sinon from 'sinon';
import mockery from 'mockery';
import { expect } from 'chai';
import { getRNMocks } from '../func.js';
import { describeWithDOM, shallow } from 'enzyme';

const React = getRNMocks();
const {
  Text,
  View,
  TouchableHighlight
} = React;
const props = {
  counter: Immutable.Map({ counter: 1}),
  increment: sinon.spy(),
  decrement: sinon.spy(),
  incrementIfOdd: sinon.spy(),
  incrementAsync: sinon.spy()
};

/* eslint no-unused-expressions: 0 */
describeWithDOM('components <Counter />', function() {
  this.timeout(5000);

  let Counter;
  before(() => {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true
    });
    mockery.registerMock('react-native', React);
    Counter = require('../../src/components/Counter').default;
  });

  after(() => {
    mockery.disable();
  });

  it('should render correctly', () => {
    const wrapper = shallow(<Counter {...props} />);
    expect(wrapper.find(View)).to.have.length(1);
    const view = wrapper.find(View);
    expect(view.find(Text)).to.have.length(5);
    expect(view.find(Text).node.props.children).to.eql([ 'Clicked: ', 1, ' times' ]);
    const touchs = view.find(TouchableHighlight);
    expect(touchs).to.have.length(4);
    [ '+', '-', 'Increment if odd', 'Increment async' ].forEach((text, i) => {
      expect(touchs.at(i).find(Text).node.props.children).to.equal(text);
    });
  });

  [ 'increment', 'decrement', 'incrementIfOdd', 'incrementAsync' ]
    .forEach((func, i) => {
      it(`should call ${func} with TouchableHighlight on press`, () => {
        const wrapper = shallow(<Counter {...props} />);
        wrapper.find(View).find(TouchableHighlight).nodes[i].props.onPress();
        expect(props[func].calledOnce).to.be.true;
      });
    });
});
