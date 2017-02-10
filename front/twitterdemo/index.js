import { AppContainer } from 'react-hot-loader';
import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Router, Route, /*browserHistory,*/ hashHistory } from 'react-router';
import StylesPage from './components/stylespage';
import SearchPage from './components/searchpage';
import RegistrationPage from './components/registrationpage';

import './styles.css';
import 'milligram-cssnext/dist/milligram.css'; // eslint-disable-line import/first

if (!process.env.GRAPHQL_ENDPOINT) throw new Error('GRAPHQL_ENDPOINT not set');

// Extensions
Array.prototype.partition = function partition(size) { const result = _.groupBy(this, function group(item, i) { return Math.floor(i / size); }); return _.values(result); }; // eslint-disable-line no-extend-native, prefer-arrow-callback
Array.prototype.intersperse = function intersperse(i) { return [].concat(...this.map(e => [i, e])).slice(1); }; // eslint-disable-line no-extend-native
String.prototype.endsWith = function endsWith(suffix) { return this.indexOf(suffix, this.length - suffix.length) !== -1; }; // eslint-disable-line no-extend-native
String.prototype.startsWith = function startsWith(prefix) { return this.slice(0, prefix.length) === prefix; }; // eslint-disable-line no-extend-native
String.prototype.replaceAll = function replaceAll(find, replace) { return this.replace(new RegExp(find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1'), 'g'), replace); }; // eslint-disable-line no-extend-native, no-useless-escape

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: process.env.GRAPHQL_ENDPOINT,
  }),
});

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <ApolloProvider client={client}>
        <Router key={Math.random()} history={hashHistory}>
          <Route path="/" component={SearchPage} />
          <Route path="/registration" component={RegistrationPage} />
          <Route path="/styles" component={StylesPage} />
        </Router>
      </ApolloProvider>
    </AppContainer>,
    document.getElementById('root'),
  );
};

render();

if (module.hot) {
  module.hot.accept('./components/searchpage', () => render());
  module.hot.accept('./components/stylespage', () => render());
  module.hot.accept('./components/registrationpage', () => render());
}
