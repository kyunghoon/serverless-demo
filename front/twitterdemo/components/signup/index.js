import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { usersQuery } from '../userlist';

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  emailChanged = (event) => {
    this.setState({ email: event.target.value });
  };

  passwordChanged = (event) => {
    this.setState({ password: event.target.value });
  };

  registerClicked = (event) => {
    event.preventDefault();
    if (!this.state.email) { throw new Error('invalid email'); }
    if (!this.state.password) { throw new Error('invalid password'); }

    this.props.submit(this.state.email, this.state.password)
      .then(_result => {
        this.setState({
          email: '',
          password: '',
        });
      }).catch(e => console.error(e));
  };

  render = () => {
    return (
      <form action="">
        <fieldset>
          <label htmlFor="emailField">Email</label>
          <input type="text" placeholder="Enter Email" id="emailField" value={this.state.email} onChange={this.emailChanged} />
          <label htmlFor="passworldField">Password</label>
          <input type="password" placeholder="Password" id="passwordField" value={this.state.password} onChange={this.passwordChanged} />
          <input className="button-primary" type="submit" value="Register" onClick={this.registerClicked} />
          <input className="float-right" type="submit" value="Sign In" onClick={this.registerClicked} />
        </fieldset>
      </form>
    );
  }
}

export const createUserQuery = gql`
  mutation ($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      id
      email
    }
  }
`;

export default graphql(createUserQuery, {
  props: ({ mutate }) => ({
    submit: (email, password) => mutate({
      variables: { email, password },
      optimisticResponse: {
        createUser: {
          id: '...',
          email,
        },
      },
      refetchQueries: [{
        query: usersQuery,
      }],
    }),
  }),
})(Signup);
