import React from 'react';
import { Flex } from 'reflexbox';
import withSelector from './hoc/selector';

const Negative = props => {
  return (
    <Flex>
      <Flex mb={1} mr={1} flexColumn justify="center">
        Neg
      </Flex>
      {props.children}
    </Flex>
  );
};

Negative.displayName = 'Negative';

export default withSelector()(Negative);

