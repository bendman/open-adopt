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

const SUPPORTED_PET_AGES = [
  'Baby', 'Young', 'Adult', 'Senior',
];

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
  description: decodeURIComponent(escape(pet.description.$t)),
  contact: {
    phone: pet.contact.phone.$t,
    email: pet.contact.email.$t,
    state: pet.contact.state.$t,
    city: pet.contact.city.$t,
    zip: pet.contact.zip.$t,
    address: pet.contact.address1.$t,
    address2: pet.contact.address2.$t,
  },
  photos: pet.media.photos ? pet.media.photos.photo.reduce((photos, photo) => {
    // Only include photos in supported sizes
    const size = SUPPORTED_PHOTO_SIZES[photo['@size']];
    if (!size) return photos;

    // Merge the size into the array of objects, sizes grouped by index/id:
    // [{ small: String, large: String }, { small: String, large: String }]
    const updated = photos.slice();
    const index = parseInt(photo['@id'], 10) - 1;
    updated[index] = Object.assign({}, updated[index], { [size]: photo.$t });
    return updated;
  }, []) : [],
});

const formatSearchParams = params => ({
  count: params.count,
  location: params.location || 97206, // default location (location is required by the API
  animal: params.species,
  sex: (params.sexes && params.sexes.length === 1)
    ? params.sexes[0].charAt(0) // M/F
    : null,
  size: (params.sizes && params.sizes.length === 1)
    ? R.invertObj(SUPPORTED_PET_SIZES)[params.sizes[0]]
    : null,
  age: (params.ages && params.ages.length === 1)
    ? params.ages[0]
    : null,
});

// One value can be filtered with the API
// All or no values means no filter
const useClientFilter = (filter, numSupportedValues) => !!(
  filter &&
  filter.length > 1 &&
  filter.length < numSupportedValues
);


export const searchPets = async (params = {}) => {
  // The API doesn't offer multiselect filtering, so filter in the client
  // rather than via the API.
  const sizesFilter = useClientFilter(params.sizes, Object.keys(SUPPORTED_PET_SIZES).length);
  const agesFilter = useClientFilter(params.ages, SUPPORTED_PET_AGES.length);

  const { data, ...res } = await fetch('pet.find', {
    queryParams: formatSearchParams({
      ...params,
      // If a multiselect triggers client filtering, request more results
      count: sizesFilter || agesFilter ? 1000 : 50,
    }),
  });

  // No results
  if (!data.petfinder.pets) return { ...res, data: [] };

  // Format results
  const filteredPets = data.petfinder.pets.pet
    // Format them first. It's a bit slower, but we don't need to mess with the
    // API specific formatting in filters
    .map(formatInbound)
    .filter(pet => (
      (!sizesFilter || params.sizes.includes(pet.size)) &&
      (!agesFilter || params.ages.includes(pet.age)) &&
      // Until we have a placeholder image, filter out pets with no media
      pet.photos.length
    ))
    .slice(0, 50);

  return {
    ...res,
    data: filteredPets,
  };
};

export const getPet = async (id) => {
  const { res, data } = await fetch('pet.get', { queryParams: { id } });
  return { ...res, data: formatInbound(data.petfinder.pet) };
};
