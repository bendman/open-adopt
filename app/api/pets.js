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

const formatInbound = pet => ({
  id: pet.id.$t,
  name: pet.name.$t,
  sex: pet.sex.$t,
  age: pet.age.$t,
  size: SUPPORTED_PET_SIZES[pet.size.$t],
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
