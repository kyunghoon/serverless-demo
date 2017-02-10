const { GraphQLList, GraphQLString, GraphQLInt, GraphQLNonNull } = require('graphql');
const resolves = require('./resolves');
const TwitterSearchResultType = require('./type');

module.exports = {
  search: {
    type: new GraphQLList(TwitterSearchResultType),
    description: 'search twitter',
    args: {
      query: { type: new GraphQLNonNull(GraphQLString) },
      count: { type: GraphQLInt },
    },
    resolve: async (source, args) => {
      const result = await resolves.search(args.query);
      resolves.create(source, args.query);
      return result;
    },
  },
};

