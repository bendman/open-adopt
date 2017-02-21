import R from 'ramda';
import React, { Component, PropTypes } from 'react';
import { View, ScrollView, Text, Image, Linking } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import styles, {
  HOT_COLOR,
  MAX_HERO_HEIGHT,
  MIN_HERO_HEIGHT,
  HERO_WIDTH,
} from './styles';
import LabeledText, { styles as labelStyles } from '../../components/LabeledText';
import PetModel, { PetSpeciesModel } from '../../data/models/pet';

// Curried function to clamp the hero height between the min and max
const clampHeroHeight = R.clamp(MIN_HERO_HEIGHT, MAX_HERO_HEIGHT);

const openURL = async (url) => {
  if (await Linking.canOpenURL(url)) Linking.openURL(url);
  else console.warn(`Couldn't open url (${url})`);
};

class Search extends Component {
  static propTypes = {
    /* eslint-disable react/no-unused-prop-types */
    species: PetSpeciesModel.isRequired,
    id: PropTypes.string.isRequired,
    /* eslint-enable react/no-unused-prop-types */
    profile: PetModel.isRequired,
  };

  constructor(...args) {
    super(...args);
    this.state = {
      loadingHero: !!this.getHeroImage(),
      heroHeight: MIN_HERO_HEIGHT,
    };
  }

  componentDidMount() {
    const bgPhoto = this.getHeroImage();
    if (bgPhoto) {
      Image.getSize(bgPhoto.large, (width, height) => {
        this.setState({
          // Maintain aspect ratio, but take full width of screen
          // unles the aspect ratio is too extreme
          loadingHero: false,
          heroHeight: clampHeroHeight(height * (HERO_WIDTH / width)),
        });
      });
    }
  }

  getHeroImage() {
    return this.props.profile.photos.length > 1
      ? this.props.profile.photos[this.props.profile.photos.length - 1]
      : null;
  }

  linkPhone = () => openURL(`tel:${this.props.profile.contact.phone.replace(/\D+/g, '')}`);
  linkEmail = () => openURL(`mailto:${this.props.profile.contact.email}`);

  renderHero() {
    const bgPhoto = this.getHeroImage();
    if (bgPhoto) {
      // Render an image hero
      return (
        <View
          style={[styles.hero, {
            height: this.state.heroHeight,
          }]}
        >
          <Image style={styles.hero_image} source={{ uri: bgPhoto.large }}>
            <LinearGradient
              colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.9)']}
              style={[styles.hero_content, styles.hero_overlay]}
            />
          </Image>
        </View>
      );
    }
    // Render a color hero
    return (
      <LinearGradient
        colors={[HOT_COLOR, '#480048']}
        style={[styles.hero_content, { height: this.state.heroHeight }]}
      />
    );
  }

  renderGallery() {
    if (this.props.profile.photos.length <= 2) return null;

    return (
      <ScrollView
        horizontal={true}
        style={styles.gallery}
        contentContainerStyle={styles.gallery_content}
      >
        {this.props.profile.photos.slice(1).map(photo => (
          <Image style={styles.gallery_image} source={{ uri: photo.small }} key={photo.small} />
        ))}
      </ScrollView>
    );
  }

  render() {
    const { contact, ...profile } = this.props.profile;
    return (
      <ScrollView style={[styles.mainContainer, { opacity: this.state.loadingHero ? 0 : 1 }]}>
        {this.renderHero()}
        <View style={styles.avatar_wrapper}>
          <Text style={styles.name}>{this.props.profile.name}</Text>
          <Image style={styles.avatar} source={{ uri: this.props.profile.photos[0].large }} />
        </View>
        <View style={styles.metaData}>
          <LabeledText style={styles.meta_item} label={profile.breeds.length > 1 ? 'Breeds' : 'Breed'}>
            {profile.breeds.join('\n')}
          </LabeledText>
          <View style={styles.meta_short}>
            <LabeledText style={[styles.meta_item, styles.meta_short_item]} label="Gender">{profile.sex}</LabeledText>
            <LabeledText style={[styles.meta_item, styles.meta_short_item]} label="Age">{profile.age}</LabeledText>
            <LabeledText style={[styles.meta_item, styles.meta_short_item]} label="Size">{profile.size}</LabeledText>
          </View>
          {this.renderGallery()}
          <View style={styles.contact}>
            <Text style={labelStyles.label}>Contact</Text>
            {!contact.phone ? null : (
              <Text onPress={this.linkPhone} style={labelStyles.value}>{contact.phone}</Text>
            )}
            {!contact.address ? null : <Text style={labelStyles.value}>{contact.address}</Text>}
            {!contact.address2 ? null : <Text style={labelStyles.value}>{contact.address2}</Text>}
            <Text style={labelStyles.value}>
              {contact.city}, {contact.state} {contact.zip}
            </Text>
            {!contact.email ? null : (
              <Text onPress={this.linkEmail} style={labelStyles.value}>{contact.email}</Text>
            )}
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default connect(
  (state, props) => ({
    profile: state.petSearch[props.species].results.find(pet => pet.id === props.id),
  }),
)(Search);
