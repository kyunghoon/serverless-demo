import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Box } from 'reflexbox';
import { compose } from 'recompose';
import withDelay from '../hoc/delay';

const SearchResult = ({ id_str, text, truncated, source, user, is_quote_status, quoted_status_id, retweet_count: retweetCount, favorite_count: favoriteCount, favorite, retweeted, possibly_sensitive, lang }) => { // eslint-disable-line no-unused-vars
  return (
    <tr>
      <td>{user.screen_name}</td>
      <td>{user.name}</td>
      <td>{text}</td>
    </tr>
  );
};

const SearchResults = ({ data }) => {
  if (data.loading) { return (<h6>Loading...</h6>); }
  if (data.error) { console.error(data.error); return <h6>Something Broke</h6>; }
  return (
    <Box ml={4} mr={4}>
      <table>
        <thead>
          <tr>
            <th>ScreenName</th>
            <th>Name</th>
            <th>Text</th>
          </tr>
        </thead>
        <tbody>
          {data.search.map(r => <SearchResult key={r.id_str} {...r} />)}
        </tbody>
      </table>
    </Box>
  );
};

export const searchQuery = gql`
  query ($query: String!) {
    search (query: $query) {
      id_str
      text
      truncated
      source
      user {
        id_str
        name
        screen_name
        location
        description
        url
      }
      is_quote_status
      quoted_status_id_str
      retweet_count
      favorite_count
      favorited
      retweeted
      possibly_sensitive
      lang
    }
  }
`;

export default compose(withDelay(2000), graphql(searchQuery))(SearchResults);
