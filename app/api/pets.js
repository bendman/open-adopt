import R from 'ramda';
import fetch from './fetch';

const SUPPORTED_PHOTO_SIZES = {
  // 't'   50
  // 'pnt' 60
  // 'fpm' 95
  // 'pn'  300
  // 'x'   500
  pn: 'small',
  x: 'large',
};

const SUPPORTED_PET_SIZES = {
  S: 'Small',
  M: 'Medium',
  L: 'Large',
  XL: 'Extra Large',
};

const SUPPORTED_PET_SEXES = {
  M: 'Male',
  F: 'Female',
};

const SUPPORTED_PET_SPECIES = {
  Dog: 'dog',
  Cat: 'cat',
};

const formatInbound = pet => ({
  id: pet.id.$t,
  name: pet.name.$t,
  sex: SUPPORTED_PET_SEXES[pet.sex.$t],
  age: pet.age.$t,
  size: SUPPORTED_PET_SIZES[pet.size.$t],
  species: SUPPORTED_PET_SPECIES[pet.animal.$t],
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
  photos: pet.media.photos.photo.reduce((photos, photo) => {
    // Only include photos in supported sizes
    const size = SUPPORTED_PHOTO_SIZES[photo['@size']];
    if (!size) return photos;

    // Merge the size into the array of objects, sizes grouped by index/id:
    // [{ small: String, large: String }, { small: String, large: String }]
    const updated = photos.slice();
    const index = parseInt(photo['@id'], 10) - 1;
    updated[index] = Object.assign({}, updated[index], { [size]: photo.$t });
    return updated;
  }, []),
});

const formatSearchParams = params => ({
  location: params.location || 97206, // default location (location is required by the API
  animal: params.species,
  sex: (params.sexes && params.sexes.length === 1)
    ? params.sexes[0].charAt(0) // M/F
    : null,
});

export const searchPets = async (params = {}) => {
  const { data, ...res } = await fetch('pet.find', {
    queryParams: formatSearchParams(params),
  });

  return {
    ...res,
    data: data.petfinder.pets.pet
      // Until we have a placeholder image, filter out pets with no media
      .filter(pet => !!R.path(['media', 'photos', 'photo'], pet))
      .map(formatInbound),
  };
};

export const getPet = async (id) => {
  const { res, data } = await fetch('pet.get', { queryParams: { id } });
  return { ...res, data: formatInbound(data.petfinder.pet) };
};
