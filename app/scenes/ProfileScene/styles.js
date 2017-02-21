import { Dimensions, StyleSheet } from 'react-native';
import applicationStyles, { NAV_BAR_HEIGHT, HOT_COLOR } from '../../theme/application-styles';

const DIMS = Dimensions.get('window');
const AVATAR_SIZE = 150;
const AVATAR_OFFSET = 160;

export { HOT_COLOR };
export const MAX_HERO_HEIGHT = DIMS.height - AVATAR_SIZE - NAV_BAR_HEIGHT;
export const MIN_HERO_HEIGHT = AVATAR_SIZE + 20;
export const HERO_WIDTH = DIMS.width;

export default StyleSheet.create({
  ...applicationStyles,

  hero: {
    alignSelf: 'stretch',
  },

  hero_content: {
    backgroundColor: 'transparent',
    padding: 20,
  },

  hero_image: {
    flex: 1,
    resizeMode: 'cover',
  },

  hero_overlay: {
    flex: 1,
  },

  avatar: {
    height: AVATAR_SIZE,
    width: AVATAR_SIZE,
    resizeMode: 'cover',
    borderRadius: AVATAR_SIZE / 2,
    borderColor: HOT_COLOR,
    borderWidth: 4,
    marginTop: 10,
  },

  // Limitations in the box model of RN mean this is the best way to absolute
  // position something you want centered.
  avatar_wrapper: {
    position: 'relative',
    marginBottom: -(AVATAR_SIZE + AVATAR_OFFSET),
    top: -AVATAR_OFFSET,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  hero_text: {
    color: 'white',
  },

  name: {
    fontSize: 32,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: 'white',
  },

  metaData: {
    paddingTop: AVATAR_OFFSET + 10,
    paddingBottom: 40,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },

  meta_short: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  meta_short_item: {
    flex: 1,
  },

  meta_item: {
    marginHorizontal: 5,
    marginVertical: 10,
  },

  contact: {
    alignItems: 'center',
    marginVertical: 10,
  },

  gallery: {
    height: AVATAR_SIZE + 20,
    alignSelf: 'stretch',
    marginVertical: 10,
  },

  gallery_content: {
    paddingVertical: 10,
    paddingHorizontal: 1,
    alignItems: 'center',
  },

  gallery_image: {
    height: AVATAR_SIZE,
    width: AVATAR_SIZE,
    marginHorizontal: 2,
  },

  attribution: {
    marginTop: 40,
    color: '#bfbfbf',
  },
});
