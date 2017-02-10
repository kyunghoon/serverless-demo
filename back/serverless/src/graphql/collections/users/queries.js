const { GraphQLList, GraphQLString, GraphQLNonNull } = require('graphql');
const getFieldNames = require('graphql-list-fields');
const UserType = require('./type');
const validate = require('./validate');
const resolves = require('./resolves');

module.exports = {
  users: {
    type: new GraphQLList(UserType),
    description: 'list of users',
    resolve: async (_source, _args, _context, info) => {
      const fields = getFieldNames(info);
      return resolves.find(fields);
    },
  },
  user: {
    type: UserType,
    description: 'get a user by id',
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (source, args) => {
      validate(args);
      return resolves.findOne(args.id);
    },
  },
  login: {
    type: UserType,
    description: 'get user by email and password',
    args: {
      email: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (source, args, context, info) => {
      validate(args);
      const fields = getFieldNames(info);
      return resolves.login(fields, args.email, args.password);
    },
  },
  viewer: {
    type: UserType,
    description: 'get current viewer',
    resolve: async (source, args, context, info) => {
      const fields = getFieldNames(info);
      return resolves.login(fields, 'guest@guests.com', 'guest');
    },
  },
};
