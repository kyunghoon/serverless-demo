import React from 'react';
import { Flex, Box } from 'reflexbox';
import { Heading } from 'rebass';
import Footer from '../footer';
import SearchResults from '../searchresults';
import QueryBuilder from '../querybuilder';

class SearchPage extends React.Component {
  constructor() {
    super();
    this.state = { query: '' };
  }

  renderResults = () => (
    <Flex flexColumn align="stretch">
      <Flex justify="center">
        <Heading level={4}>Search Results{ this.state.query ? ` for ${this.state.query}` : '' }</Heading>
      </Flex>
      <SearchResults query={this.state.query} />
    </Flex>
  );

  renderNoResults = () => (<div />);

  queryChanged = query => {
    this.setState({ query });
  };

  render = () => {
    return (
      <Flex flexColumn style={{ minHeight: '100vh' }}>
        <Flex col={12} flexColumn flexAuto>
          <QueryBuilder onQueryChange={this.queryChanged} />
          <Box>
            {this.state.query ? this.renderResults() : this.renderNoResults()}
          </Box>
        </Flex>
        <Footer />
      </Flex>
    );
  }
}

export default SearchPage;
