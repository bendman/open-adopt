import { searchPets, getPet } from '../app/api/pets';

const petModel = (
  expect.objectContaining({
    id: expect.anything(),
    name: expect.any(String),
    sex: expect.any(String),
    age: expect.any(String),
    size: expect.any(String),
    species: expect.any(String),
    breeds: expect.arrayContaining([expect.any(String)]),
    // TODO: values within contact are optional, but jest doesn't
    // appear ready for model-based assertions.  This should be good enough
    // for now.
    // IDEA: Assertion models as flexible as the React.PropTypes structure.
    //
    // contact: expect.objectContaining({
    //   phone: expect.any(String),
    //   email: expect.any(String),
    //   state: expect.any(String),
    //   city: expect.any(String),
    //   zip: expect.any(String),
    //   address: expect.any(String),
    // }),
    contact: expect.any(Object),
    photos: expect.arrayContaining([
      expect.objectContaining({
        small: expect.any(String),
        large: expect.any(String),
      }),
    ]),
  })
);

const validatePets = pets => expect(pets).toEqual(
  expect.arrayContaining([petModel]),
);

const validatePet = pet => expect(pet).toEqual(petModel);

describe('searchPets', () => {
  it('returns a list of pets when searching', async () => {
    const { data: pets } = await searchPets();
    validatePets(pets);
  });

  it('accepts query parameters', async () => {
    // Verify that query parameters are accepted and results actually change
    const { data: cats } = await searchPets({ species: 'cat' });
    cats.forEach(pet => expect(pet.species.toLowerCase()).toBe('cat'));

    const { data: dogs } = await searchPets({ species: 'dog' });
    dogs.forEach(pet => expect(pet.species.toLowerCase()).toBe('dog'));
  });
});

describe('getPet', () => {
  it('returns a valid pet', async () => {
    // Grab some pets
    const { data: pets } = await searchPets();
    const { data: pet } = await getPet(pets[0].id);
    validatePet(pet);
  });
});
