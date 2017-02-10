const { GraphQLList, GraphQLObjectType, GraphQLString, GraphQLNonNull } = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'User',
  description: 'User',
  fields: () => (
    {
      email: { type: GraphQLString },
      id: { type: new GraphQLNonNull(GraphQLString) },
      name: { type: GraphQLString },
      permissions: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
      screenName: { type: GraphQLString },
      token: { type: GraphQLString },
    }
  ),
});
