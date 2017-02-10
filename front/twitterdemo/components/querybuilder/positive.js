import React from 'react';
import { Flex } from 'reflexbox';
import withSelector from './hoc/selector';

const Positive = props => {
  return (
    <Flex>
      <Flex mb={1} mr={1} flexColumn justify="center">
        Pos
      </Flex>
      {props.children}
    </Flex>
  );
};

Positive.displayName = 'Positive';

export default withSelector()(Positive);

