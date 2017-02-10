import React from 'react';
import renderer from 'react-test-renderer'; // eslint-disable-line import/no-extraneous-dependencies

window.matchMedia = window.matchMedia || function matchMedia() {
  return {
    matches: false,
    addListener() {},
    removeListener() {},
  };
};

function createNodeMock() { return { focus: () => { } }; }

describe('querybuilder', () => {
  describe('term', () => {
    it('should trigger the onClick event', () => {
      const Term = require('../term').default;
      const otherMock = jest.fn();
      const clickMock = jest.fn();
      const component = renderer.create(
        <Term
          value=""
          focused
          onAddClick={otherMock}
          onRemoveClick={otherMock}
          onClick={clickMock}
          onFocus={otherMock}
          onBlur={otherMock}
          onChange={otherMock}
          onKeyUp={otherMock}
        />,
        { createNodeMock });

      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      const input = tree.children[0].children[0].children[0].children[0];
      input.props.onClick();
      expect(clickMock.mock.calls.length).toBe(1);
      expect(otherMock.mock.calls.length).toBe(0);

      tree = component.toJSON(); // rerender
      expect(tree).toMatchSnapshot();
    });
  });
});
