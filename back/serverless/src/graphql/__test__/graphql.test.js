jest.mock('../collections/auth');

const createUser = async (name, id) => {
  const graphql = require('..');
  require('uuid-js').__set(`id-${id}`);
  const query = `
    mutation {
      createUser (email: "${name}", password: "passpass") {
        id name email token screenName permissions
      }
    }`;
  return graphql(query, {});
};

const expectOk = result => {
  expect(result.errors).toBeUndefined();
  expect(result.data).toBeDefined();
};

const expectError = result => {
  expect(result.errors).toBeDefined();
};

describe('graphql', () => {
  it('should get the viewer', async () => {
    const graphql = require('..');
    const query = `
      query {
        viewer {
          id name email token screenName permissions
        }
      }`;
    const result = await graphql(query, {});
    expectOk(result);
    expect(result).toMatchSnapshot();
  });

  it('should update a user', async () => {
    const graphql = require('..');
    const result = await createUser('update@test.com', '0');
    expectOk(result);
    const query = `
      mutation {
        updateUser (id: "${result.data.createUser.id}", name: "updated name", screenName: "updated screenname") {
          id name email token screenName permissions
        }
      }`;
    const result2 = await graphql(query, {});
    expectOk(result2);
    expect(result2).toMatchSnapshot();
  });

  it('should fail to update a non-existing user', async () => {
    const graphql = require('..');
    const query = `
      mutation {
        updateUser (id: "1003", name: "updated name", screenName: "updated screenName") {
          id name email token screenName permissions
        }
      }`;
    const result = await graphql(query, {});
    expectError(result);
    expect(result).toMatchSnapshot();
  });

  it('should create a user', async () => {
    const result = await createUser('create@test.com', '1');
    expectOk(result);
    expect(result).toMatchSnapshot();
  });

  it('should fail to create a user with an existing email', async () => {
    const result = await createUser('existing@test.com', '2');
    expectOk(result);
    const result2 = await createUser('existing@test.com', '3');
    expectError(result2);
    expect(result2).toMatchSnapshot();
  });

  it('should remove a user', async () => {
    const graphql = require('..');
    const result = await createUser('remove@test.com', '4');
    expectOk(result);
    const query = `
      mutation {
        removeUser (id: "${result.data.createUser.id}") {
          id
        }
      }`;
    const result2 = await graphql(query, {});
    expectOk(result2);
    expect(result2).toMatchSnapshot();
  });

  describe('login', () => {
    const graphql = require('..');
    let user = null;

    beforeAll(async () => {
      const result = await createUser('login@test.com', '5');
      expectOk(result);
      user = result.data.createUser;
    });

    it('should find a user', async () => {
      const query = `
        query {
          user (id: "${user.id}") {
            id name email token screenName permissions
          }
        }`;
      const result = await graphql(query, {});
      expectOk(result);
      expect(result).toMatchSnapshot();
    });

    it('should login with a correct password', async () => {
      const query = `
        query {
          login (email: "${user.email}", password: "passpass") {
            id name email token screenName permissions
          }
        }`;
      const result = await graphql(query, {});
      expectOk(result);
      expect(result).toMatchSnapshot();
    });

    it('should not login with a bad password', async () => {
      const query = `
        query {
          login (email: "${user.email}", password: "badbad") {
            id name email token screenName permissions
          }
        }`;
      const result = await graphql(query, {});
      expectError(result);
      expect(result).toMatchSnapshot();
    });
  });
});
