import React from 'react';
import { Flex } from 'reflexbox';
import withSelector from './hoc/selector';

const Exact = props => {
  return (
    <Flex>
      <Flex mb={1} mr={1} flexColumn justify="center">
        Exact
      </Flex>
      {props.children}
    </Flex>
  );
};

Exact.displayName = 'Exact';

export default withSelector()(Exact);

