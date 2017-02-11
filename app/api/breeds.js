import fetch from './fetch';

const formatInbound = json => json.petfinder.breeds.breed.map(breed => breed.$t);

export const getBreeds = async (animal = 'dog') => {
  const breeds = await fetch('breed.list', { queryParams: { animal } });
  return formatInbound(breeds);
};
