const uuid = jest.genMockFromModule('uuid-js');

uuid.__value = '00000000-0000-0000-0000-000000000000';

uuid.create = jest.fn(() => uuid.__value);

uuid.__set = (value) => {
  uuid.__value = value;
};

module.exports = uuid;
