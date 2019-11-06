import expect from 'expect';

import execSteps from './execSteps.js';

export default (history, done) => {
  let steps = [
    ({ location }) => {
      expect(location).toMatchObject({
        pathname: '/'
      });

      history.navigate('/the/path?the=query#the-hash');
    },
    ({ action, location }) => {
      expect(action).toBe('PUSH');
      expect(location).toMatchObject({
        pathname: '/the/path',
        search: '?the=query',
        hash: '#the-hash'
      });

      history.navigate('../other/path?another=query#another-hash');
    },
    ({ action, location }) => {
      expect(action).toBe('PUSH');
      expect(location).toMatchObject({
        pathname: '/other/path',
        search: '?another=query',
        hash: '#another-hash'
      });
    }
  ];

  execSteps(steps, history, done);
};
