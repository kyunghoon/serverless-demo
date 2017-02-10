const { GraphQLBoolean, GraphQLInt, GraphQLObjectType, GraphQLString, GraphQLNonNull } = require('graphql');

const TwitterUser = new GraphQLObjectType({
  name: 'TwitterUser',
  description: 'twitter user',
  fields: () => (
    {
      id_str: { type: GraphQLString },
      name: { type: GraphQLString },
      screen_name: { type: GraphQLString },
      location: { type: GraphQLString },
      description: { type: GraphQLString },
      url: { type: GraphQLString },
    }
  ),
});

module.exports = new GraphQLObjectType({
  name: 'TwitterSearchResult',
  description: 'twitter search result',
  fields: () => (
    {
      id_str: { type: GraphQLString },
      text: { type: GraphQLString },
      truncated: { type: GraphQLBoolean },
      source: { type: GraphQLString },
      user: { type: new GraphQLNonNull(TwitterUser) },
      is_quote_status: { type: GraphQLBoolean },
      quoted_status_id_str: { type: GraphQLString },
      retweet_count: { type: GraphQLInt },
      favorite_count: { type: GraphQLInt },
      favorited: { type: GraphQLBoolean },
      retweeted: { type: GraphQLBoolean },
      possibly_sensitive: { type: GraphQLBoolean },
      lang: { type: GraphQLString },
    }
  ),
});
