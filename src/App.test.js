import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import renderer from 'react-test-renderer'

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  describe('Snapshots', () => {
    let component;
    beforeEach(() => {
      component = renderer.create(<App />);
    });
    it('renders correctly', () => {
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
})