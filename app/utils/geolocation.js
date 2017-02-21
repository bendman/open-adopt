import Geocoder from 'react-native-geocoder';

export function getLocation() {
  return new Promise((resolve, reject) => {
    global.navigator.geolocation.getCurrentPosition(async (pos) => {
      const geocoded = await Geocoder.geocodePosition({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
      resolve(geocoded[0].postalCode);
    }, reject);
  });
}
