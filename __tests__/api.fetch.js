import { _private as privateMethods } from '../app/api/fetch';

it('returns a proper query string', () => {
  const correctAnswer = 'foo=bar&buzz=lightyear&number=5&space=has%20space';
  const answer = privateMethods.getQueryString({
    foo: 'bar',
    buzz: 'lightyear',
    number: 5,
    space: 'has space',
  });

  expect(answer).toBe(correctAnswer);
});
