import { PETFINDER_KEY } from '../env.secret';

const PETFINDER_URL = 'http://api.petfinder.com/';

const BASE_API_PARAMS = {
  key: PETFINDER_KEY,
  format: 'json',
};

// Return GET query string parameters based on an object
const getQueryString = obj => (
  Object.keys(obj)
        .filter(key => !!obj[key]) // filter out empty values
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
        .join('&')
);

// `fetch` with abstraction for API URI and settings
const apiFetch = async (
  resource,
  { queryParams, ...settings } = { queryParams: {} },
) => {
  // these are used in both the try and catch
  let res;
  let data;

  // Build GET params, including API required settings
  const finalParams = Object.assign({}, BASE_API_PARAMS, queryParams);
  const queryString = getQueryString(finalParams);

  // Construct URL and call resource
  const finalURL = `${PETFINDER_URL}${resource}?${queryString}`;
  try {
    res = await fetch(finalURL, settings);
    data = await res.json();

    // Parse and return response
    return { data, res };
  } catch (error) {
    console.info({ params: finalParams, url: finalURL, res });
    return { data, res, error };
  }
};

export default apiFetch;

// Expose tested methods
let _private; // eslint-disable-line import/no-mutable-exports, no-underscore-dangle
if (process.env.NODE_ENV === 'test') _private = { getQueryString };
export { _private };
