import { PETFINDER_KEY } from '../env.secret';

const PETFINDER_URL = 'http://api.petfinder.com/';

const BASE_API_PARAMS = {
  key: PETFINDER_KEY,
  format: 'json',
};

// Return GET query string parameters based on an object
const getQueryString = obj => (
  Object.keys(obj)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
        .join('&')
);

// `fetch` with abstraction for API URI and settings
const apiFetch = async (
  resource,
  { queryParams, ...settings } = { queryParams: {} },
) => {
  // Build GET params, including API required settings
  const finalParams = Object.assign({}, BASE_API_PARAMS, queryParams);
  const queryString = getQueryString(finalParams);

  // Construct URL and call resource
  const finalURL = `${PETFINDER_URL}${resource}?${queryString}`;
  const res = await fetch(finalURL, settings);

  // Parse and return response
  return res.json();
};

export default apiFetch;

// Expose tested methods
let _private; // eslint-disable-line import/no-mutable-exports, no-underscore-dangle
if (process.env.NODE_ENV === 'test') _private = { getQueryString };
export { _private };
