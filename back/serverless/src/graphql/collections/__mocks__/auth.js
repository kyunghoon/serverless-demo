const auth = jest.genMockFromModule('../auth');

auth.authenticate = () =>
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imd1ZXN0QGd1ZXN0cy5jb20iLCJoYXNoIjoiJDJhJDEwJGJ1dTFOYmdoWUI0MEJjWGgzeXFyWmVER2d5eGQ1VmY1dS9Cd3V5SlZGZFl0U1RneTdxZEtLIiwiaWQiOiIxIiwiaWF0IjoxNDg1OTk4MjA2fQ.zp8jknsjvj_qxv3UvIaOhOS_d1wOqpI-IzqrRJCqMxM';

module.exports = auth;

