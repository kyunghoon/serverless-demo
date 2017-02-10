import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Button } from 'rebass';
import { usersQuery } from '../userlist';

const UserItem = ({ email, id, name, screenName, submit }) => (
  <tr>
    <td>{email}</td>
    <td>{id}</td>
    <td>{name}</td>
    <td>{screenName}</td>
    <td>
      <Button onClick={() => submit(id)}>Remove</Button>
    </td>
  </tr>
);

export const removeUserQuery = gql`
  mutation ($id: String!) {
    removeUser(id: $id) { id }
  }
`;

export default graphql(removeUserQuery, {
  props: ({ mutate }) => ({
    submit: (id) => mutate({
      variables: { id },
      refetchQueries: [{
        query: usersQuery,
      }],
    }),
  }),
})(UserItem);
