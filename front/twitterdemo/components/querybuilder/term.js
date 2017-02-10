import React from 'react';
import Rambda from 'rambda';
import { Flex, withReflex } from 'reflexbox';
import withSelector from './hoc/selector';

class Term extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }
  componentDidMount = () => {
    this.input.focus();
  };
  focus = e => {
    // fix to move cursor to end of input
    e.target.value = e.target.value; // eslint-disable-line no-param-reassign

    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  };
  click = e => {
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  }
  change = e => {
    this.props.onChange(e);
  }
  keyUp = e => {
    if (e.key === 'Backspace') {
      if (e.target.value.length === 0) {
        this.input.blur();
      }
    }
    this.props.onKeyUp(e);
  }
  render = () => (
    <Flex>
      <input
        ref={input => {
          this.input = input;
          if (this.input) { if (this.props.focused) this.input.focus(); }
        }}
        style={{ textAlign: 'center', marginBottom: '8px' }}
        autoFocus={false}
        type="text"
        placeholder="Term"
        value={this.props.value}
        onClick={this.click}
        onFocus={this.focus}
        onBlur={this.props.onBlur}
        onChange={this.change}
        onKeyUp={this.keyUp}
      />
    </Flex>
  );
}

Term.displayName = 'Term';

Term.propTypes = {
  value: React.PropTypes.string.isRequired,
  focused: React.PropTypes.bool,
  onClick: React.PropTypes.func.isRequired,
  onFocus: React.PropTypes.func.isRequired,
  onBlur: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onKeyUp: React.PropTypes.func.isRequired,
};

Term.defaultProps = {
  focused: false,
};

export default Rambda.compose(withReflex(), withSelector(true))(Term);
