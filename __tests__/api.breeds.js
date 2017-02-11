import { getBreeds } from '../app/api/breeds';

it('returns a list of breeds', async () => {
  const breeds = await getBreeds();

  expect(breeds).toEqual(
    expect.arrayContaining([expect.any(String)]),
  );
});
