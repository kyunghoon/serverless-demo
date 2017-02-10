import React from 'react';
import { Flex, Box } from 'reflexbox';
import { Button } from 'rebass';
import Ands from './ands';
import { joinTerms } from './helpers';

const getAndKeyList = (props, orKey) => Object.entries(props.ors.find(([k]) => k === orKey)[1]).map(([k]) => k);
const getOrKeyList = props => props.ors.map(([k]) => k);
const getFirstOrKey = props => getOrKeyList(props)[0];
const getLastOrKey = props => props.ors[props.ors.length - 1][0];
const getPrevOrKey = (props, orKey) => {
  const keyList = getOrKeyList(props);
  const index = keyList.findIndex(k => k === orKey);
  if (index < 1) return null;
  return keyList[index - 1];
};
const getNextOrKey = (props, orKey) => {
  const keyList = getOrKeyList(props);
  const index = keyList.findIndex(k => k === orKey);
  if (index + 1 > keyList.length - 1) return null;
  return keyList[index + 1];
};

class Ors extends React.Component {
  constructor(props) {
    super(props);
    this.state = { focusedKey: getFirstOrKey(props) };
  }
  componentWillReceiveProps = newProps => {
    if (newProps.ors.length > this.props.ors.length) {
      this.setState({ focusedKey: getLastOrKey(newProps) });
    } else if (newProps.ors.length < this.props.ors.length) {
      const prevOrKey = getPrevOrKey(this.props);
      if (prevOrKey !== null) {
        this.setState({ focusedKey: prevOrKey });
      }
    }
  }
  termKeyUp = (e, orKey, andKey) => {
    if (e.key === 'Backspace' && e.target.value.trim().length === 0) {
      const andList = getAndKeyList(this.props, orKey);
      if ((andList.length > 0 && parseInt(andKey, 10) <= parseInt(andList[0], 10))
        || (andList.length === 0 && e.target.value.length === 0)) {
        const prevOrKey = getPrevOrKey(this.props, orKey);
        if (prevOrKey !== null) {
          this.setState({ focusedKey: prevOrKey });
        } else if (andList.length === 0) {
          const nextOrKey = getNextOrKey(this.props, orKey);
          if (nextOrKey !== null) {
            this.setState({ focusedKey: nextOrKey });
          }
        }
      }
    }
    this.props.onTermKeyUp(e, orKey, andKey);
  }
  termBlur = (e, orKey, andKey) => {
    if (this.props.onTermBlur) {
      this.props.onTermBlur(e, orKey, andKey);
    }
  }
  termFocus = (e, orKey, andKey) => {
    if (this.props.onTermFocus) {
      this.props.onTermFocus(e, orKey, andKey);
    }
  }
  termClick = (e, orKey, andKey) => {
    this.setState({ focusedKey: orKey });
    if (this.props.onTermClick) {
      this.props.onTermClick(e, orKey, andKey);
    }
  }
  andClick = (e, orKey) => {
    this.setState({ focusedKey: orKey });
    this.props.onAndClick(e, orKey);
  }
  renderOr = ([orKey, ands], index) => {
    if (!orKey) {
      return (<Box mb={1} key={`_${index}`}>OR</Box>);
    }
    const sorted = Object.entries(ands).sort(([a], [b]) => parseInt(a, 10) > parseInt(b, 10));
    return (<Ands
      key={orKey} id={orKey} ands={sorted} onAndClick={this.andClick}
      focused={this.state.focusedKey === orKey}
      onTermClick={this.termClick}
      onTermBlur={this.termBlur}
      onTermChange={this.props.onTermChange}
      onTermKeyUp={this.termKeyUp}
      onTermFocus={this.termFocus}
      onTermUpdateExpression={this.props.onTermUpdateExpression}
    />);
  };
  orClick = e => {
    this.props.onOrClick(e);
  }
  render = () => {
    //console.log('OR-FOCUS-KEY:', this.state.focusedKey);
    const last = Object.entries(this.props.ors[this.props.ors.length - 1][1]);
    const shouldRenderButton = last.reduce((r, [_k, v]) => r + joinTerms(v).length, 0) > 0;
    return (
      <Flex flexColumn align="center">
        {this.props.ors.intersperse([]).map(this.renderOr)}
        {!shouldRenderButton ? (<span />) : (<Button pl={1} pr={1} onClick={this.orClick}>+Or</Button>)}
      </Flex>
    );
  }
}

Ors.displayName = 'Ors';

Ors.propTypes = {
  ors: React.PropTypes.arrayOf(React.PropTypes.array).isRequired,
  onTermClick: React.PropTypes.func,
  onOrClick: React.PropTypes.func.isRequired,
  onAndClick: React.PropTypes.func.isRequired,
  onTermFocus: React.PropTypes.func,
  onTermBlur: React.PropTypes.func,
  onTermChange: React.PropTypes.func.isRequired,
  onTermKeyUp: React.PropTypes.func.isRequired,
  onTermUpdateExpression: React.PropTypes.func.isRequired,
};

Ors.defaultProps = {
  onTermClick: null,
  onTermFocus: null,
  onTermBlur: null,
};

export default Ors;
