import { StyleSheet } from 'react-native';
import applicationStyles from '../../theme/application-styles';

export default StyleSheet.create({
  ...applicationStyles,

  resultsContainer: {},

  resultsItem: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
    borderBottomWidth: 1,
    backgroundColor: 'white',
  },

  resultsItem_imageWrapper: {
    height: 80,
    width: 80,
    borderRadius: 40,
    padding: 4,
    shadowOpacity: 0.4,
    shadowColor: 'black',
    shadowRadius: 1,
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },

  resultsItem_image: {
    flex: 1,
    resizeMode: 'cover',
    borderRadius: 36,
  },

  resultsItem_details: {
    flex: 1,
    paddingLeft: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },

  resultsItem_name: {
    fontSize: 24,
    marginBottom: 6,
  },

  resultsItem_meta: {
    fontSize: 16,
    color: '#bbb',
  },
});
