// Greemo template names used in src/content/*.md, mapped to the Vue sections that render them.
import FeaturedHero from './featured-hero/component.vue'
import GameTiles from './game-tiles/component.vue'
import CollectionStrip from './collection-strip/component.vue'
import FeaturesSplit from './features-split/component.vue'
import PageHead from './page-head/component.vue'
import GameList from './game-list/component.vue'
import Downloads from './downloads/component.vue'
import GameHero from './game-hero/component.vue'
import GameIntro from './game-intro/component.vue'
import GameFeatures from './game-features/component.vue'
import GameGallery from './game-gallery/component.vue'
import AboutBody from './about-body/component.vue'
import Contact from './contact/component.vue'

export const sections = {
  'featured-hero': FeaturedHero,
  'game-tiles': GameTiles,
  'collection-strip': CollectionStrip,
  'features-split': FeaturesSplit,
  'page-head': PageHead,
  'game-list': GameList,
  downloads: Downloads,
  'game-hero': GameHero,
  'game-intro': GameIntro,
  'game-features': GameFeatures,
  'game-gallery': GameGallery,
  'about-body': AboutBody,
  contact: Contact
}
