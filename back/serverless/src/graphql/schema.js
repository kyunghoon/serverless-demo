const { GraphQLObjectType, GraphQLSchema } = require('graphql');

const userQueries = require('./collections/users/queries');
const queryQueries = require('./collections/queries/queries');

const userMutations = require('./collections/users/mutations');

const queries = Object.assign({},
  userQueries,
  queryQueries,
);

const mutations = Object.assign({},
  userMutations,
);

const Queries = new GraphQLObjectType({
  name: 'Queries',
  fields: queries,
});

const Mutations = new GraphQLObjectType({
  name: 'Mutations',
  fields: mutations,
});

module.exports = new GraphQLSchema({
  query: Queries,
  mutation: Mutations,
});

