import React from 'react';
import { Flex, Box } from 'reflexbox';
import { Button } from 'rebass';
import { joinTerms, renderExpression } from './helpers';

const getAndKeyList = props => props.ands.map(([k]) => k);
const getFirstAndKey = props => getAndKeyList(props)[0];
const getPrevAndKey = (props, andKey) => {
  const keyList = getAndKeyList(props);
  const index = keyList.findIndex(k => k === andKey);
  if (index < 1) return null;
  return keyList[index - 1];
};
const getNextAndKey = (props, andKey) => {
  const keyList = getAndKeyList(props);
  const index = keyList.findIndex(k => k === andKey);
  if (index + 1 > keyList.length - 1) return null;
  return keyList[index + 1];
};

class Ands extends React.Component {
  constructor(props) {
    super(props);
    this.state = { focusedKey: getFirstAndKey(props) };
  }
  termChange = (e, orKey, andKey) => {
    this.setState({ focusedKey: andKey });
    this.props.onTermChange(e, orKey, andKey);
  }
  termKeyUp = (e, orKey, andKey) => {
    if (e.key === 'Backspace' && e.target.value.trim().length === 0) {
      const prevAndKey = getPrevAndKey(this.props, andKey);
      if (prevAndKey !== null) {
        this.setState({ focusedKey: prevAndKey });
      } else {
        const nextAndKey = getNextAndKey(this.props, andKey);
        if (nextAndKey !== null) {
          this.setState({ focusedKey: nextAndKey });
        }
      }
    }
    this.props.onTermKeyUp(e, orKey, andKey);
  }
  termClick = (e, orKey, andKey) => {
    this.setState({ focusedKey: andKey });
    this.props.onTermClick(e, orKey, andKey);
  }
  termBlur = (e, orKey, andKey) => {
    this.props.onTermBlur(e, orKey, andKey);
  }
  termUpdateExpression = ({ type, value }, orKey, andKey) => {
    this.props.onTermUpdateExpression(value, orKey, andKey);
  }
  renderAnd = ([andKey, value], orKey, index) => {
    const props = {
      onClick: e => this.termClick(e, orKey, andKey),
      onBlur: e => this.termBlur(e, orKey, andKey),
      onFocus: e => this.props.onTermFocus(e, orKey, andKey),
      onChange: e => this.termChange(e, orKey, andKey),
      onKeyUp: e => this.termKeyUp(e, orKey, andKey),
      onUpdateExpression: e => this.termUpdateExpression(e, orKey, andKey),
      focused: this.props.focused && andKey === this.state.focusedKey,
    };
    const ret = renderExpression(props, value);
    if (index === 0) {
      return <Box key={`_${index}`}>{ret}</Box>;
    } else {
      return <Flex align="center" key={`_${index}`}><Box mb={1} ml={1} mr={1}>AND</Box>{ret}</Flex>;
    }
  };

  render = () => {
    this.childInputRefs = [];
    const last = this.props.ands[this.props.ands.length - 1];
    const shouldRenderButton = joinTerms(last[last.length - 1]).length > 0;
    return (
      <Flex key={this.props.id} pl={1} pt={1} pr={1} mb={1} wrap align="center" style={{ borderWidth: 2, borderStyle: 'dashed', borderColor: 'lightgray', borderRadius: '6px' }}>
        {this.props.ands.map((pair, index) => this.renderAnd(pair, this.props.id, index))}
        {!shouldRenderButton ?
          null : (<Flex flexColumn justify="center"><Button ml={1} mb={1} pl={1} pr={1} onClick={e => this.props.onAndClick(e, this.props.id)}>+And</Button></Flex>)
        }
      </Flex>
    );
  }
}

Ands.displayName = 'Ands';

Ands.propTypes = {
  focused: React.PropTypes.bool,
  id: React.PropTypes.string.isRequired,
  ands: React.PropTypes.arrayOf(React.PropTypes.array).isRequired,
  onTermClick: React.PropTypes.func.isRequired,
  onAndClick: React.PropTypes.func.isRequired,
  onTermBlur: React.PropTypes.func.isRequired,
  onTermFocus: React.PropTypes.func.isRequired,
  onTermChange: React.PropTypes.func.isRequired,
  onTermKeyUp: React.PropTypes.func.isRequired,
  onTermUpdateExpression: React.PropTypes.func.isRequired,
};

Ands.defaultProps = {
  focused: false,
};

export default Ands;
