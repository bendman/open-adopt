import fetch from './fetch';

const formatInbound = pet => ({
  id: pet.id.$t,
  name: pet.name.$t,
  sex: pet.sex.$t,
  age: pet.age.$t,
  size: pet.size.$t,
  species: pet.animal.$t,
  // Breeds are returned as either an array or just a single breed object so
  // ensure these are always an array
  breeds: Array.isArray(pet.breeds.breed)
    ? pet.breeds.breed.map(breed => breed.$t)
    : [pet.breeds.breed.$t],
  contact: {
    phone: pet.contact.phone.$t,
    email: pet.contact.email.$t,
    state: pet.contact.state.$t,
    city: pet.contact.city.$t,
    zip: pet.contact.zip.$t,
    address: pet.contact.address1.$t,
  },
});

export const searchPets = async (params = {}) => {
  const data = await fetch('pet.find', {
    queryParams: {
      location: 97206, // default location (location is required by the API)
      ...params,
    },
  });
  return data.petfinder.pets.pet.map(formatInbound);
};

export const getPet = async (id) => {
  const data = await fetch('pet.get', { queryParams: { id } });
  return formatInbound(data.petfinder.pet);
};
