import React from 'react';
import { Flex } from 'reflexbox';
import withSelector from './hoc/selector';

const Not = props => {
  return (
    <Flex>
      <Flex mb={1} mr={1} flexColumn justify="center">
        Not
      </Flex>
      {props.children}
    </Flex>
  );
};

Not.displayName = 'Not';

export default withSelector()(Not);

