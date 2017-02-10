import React from 'react';
import { Flex } from 'reflexbox';
import withSelector from './hoc/selector';

const Mention = props => {
  return (
    <Flex>
      <Flex mb={1} mr={1} flexColumn justify="center">
        Mention
      </Flex>
      {props.children}
    </Flex>
  );
};

Mention.displayName = 'Mention';

export default withSelector()(Mention);

