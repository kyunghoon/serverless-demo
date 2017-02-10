require('babel-polyfill');
const React = require('react');
const ReactDOM = require('react-dom');
const GraphiQL = require('graphiql');
const { Router, Route, browserHistory } = require('react-router');
require('./node_modules/graphiql/graphiql.css');

if (!process.env.GRAPHQL_ENDPOINT) {
  throw new Error('GRAPHQL_ENDPOINT is not defined');
}

function graphQLFetcher(graphQLParams) {
  return fetch(process.env.GRAPHQL_ENDPOINT, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(graphQLParams),
  }).then(response => response.json());
}

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="*" component={() => (<GraphiQL fetcher={graphQLFetcher} />)} />
  </Router>,
  document.getElementById('root'),
);
