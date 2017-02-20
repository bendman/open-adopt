import { PropTypes } from 'react';
import PhotoModel from './photo';

// Utility to grab a random item from an array
const sample = array => array[Math.floor(Math.random() * array.length)];

// Fixtures
const PET_SEXES = ['Male', 'Female'];
const PET_AGES = ['Baby', 'Young', 'Adult', 'Senior'];
const PET_SIZES = ['Small', 'Medium', 'Large', 'Extra Large'];
const PET_SPECIES = ['dog', 'cat'];

export const PetSpeciesModel = PropTypes.oneOf(PET_SPECIES);

// PropTypes Models
const PetModel = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  sex: PropTypes.oneOf(PET_SEXES),
  age: PropTypes.oneOf(PET_AGES),
  size: PropTypes.oneOf(PET_SIZES),
  species: PetSpeciesModel,
  breeds: PropTypes.arrayOf(PropTypes.string),
  contact: PropTypes.shape({
    phone: PropTypes.string,
    email: PropTypes.string,
    state: PropTypes.string,
    city: PropTypes.string,
    zip: PropTypes.string,
    address: PropTypes.string,
    address2: PropTypes.string,
  }),
  photos: PropTypes.arrayOf(PhotoModel),
});
export default PetModel;

// Mocks
export const mocks = {};

mocks.pet = {
  id: 'abcde',
  name: 'Kojo',
  sex: sample(PET_SEXES),
  age: sample(PET_AGES),
  size: sample(PET_SIZES),
  species: sample(PET_SPECIES),
  breeds: ['Golden Retreiver', 'Boxer'],
  contact: {
    city: 'Portland',
    state: 'OR',
    zip: '97214',
  },
  photos: [{
    large: 'http://photos.petfinder.com/photos/pets/29412351/1/?bust=1401987860&width=500&-x.jpg',
    small: 'http://photos.petfinder.com/photos/pets/29412351/1/?bust=1401987860&width=300&-pn.jpg',
  }, {
    large: 'http://photos.petfinder.com/photos/pets/29412351/2/?bust=1401987861&width=500&-x.jpg',
    small: 'http://photos.petfinder.com/photos/pets/29412351/1/?bust=1401987860&width=300&-pn.jpg',
  }],
};

mocks.petList = Array.from({ length: 10 })
  .map((p, i) => Object.assign({}, mocks.pet, { id: i.toString() }));
