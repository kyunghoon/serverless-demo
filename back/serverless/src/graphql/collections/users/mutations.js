const { GraphQLString, GraphQLNonNull } = require('graphql');
const UserType = require('./type');
const validate = require('./validate');
const resolves = require('./resolves');

module.exports = {
  createUser: {
    type: UserType,
    description: 'Create User',
    args: {
      email: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (_source, args) => {
      validate(args);
      return resolves.create(args.email, args.password);
    },
  },
  loginUser: {
    type: UserType,
    description: 'Login User',
    args: {
      email: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (source, args) => {
      validate(args);
      return resolves.login(args.email, args.password);
    },
  },
  updateUser: {
    type: UserType,
    description: 'Delete User',
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
      name: { type: GraphQLString },
      screenName: { type: GraphQLString },
      description: { type: GraphQLString },
    },
    resolve: (_source, args) => resolves.update(args.id, args.name, args.screenName),
  },
  removeUser: {
    type: UserType,
    description: 'Delete User',
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: (_source, args) => resolves.remove(args.id),
  },
};
