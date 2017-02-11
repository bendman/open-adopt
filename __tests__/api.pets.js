import { searchPets } from '../app/api/pets';

const validatePets = (pets) => {
  expect(pets).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        id: expect.anything(),
        name: expect.any(String),
        sex: expect.any(String),
        age: expect.any(String),
        size: expect.any(String),
        species: expect.any(String),
        breeds: expect.arrayContaining([ expect.any(String) ]),
        contact: expect.objectContaining({
          phone: expect.any(String),
          email: expect.any(String),
          state: expect.any(String),
          city: expect.any(String),
          zip: expect.any(String),
          address: expect.any(String),
        }),
      })
    ])
  );
}

it('returns a list of pets', async () => {
  const pets = await searchPets();
  validatePets(pets);
});

it('accepts query parameters', async () => {
  // Verify that query parameters are accepted and results actually change
  const cats = await searchPets({ animal: 'cat' });
  cats.forEach(pet => expect(pet.species.toLowerCase()).toBe('cat'));

  const dogs = await searchPets({ animal: 'dog' })
  dogs.forEach(pet => expect(pet.species.toLowerCase()).toBe('dog'));
});
