import { Hero, HeroProps } from './components/Hero';
import { sanityFetch } from '../../sanity/lib/sanity.fetch';
import CenteredHeader, { type HeaderProps } from './components/Header';
import { Nav } from './components/Nav';

type PageBuilder = {
  components: {
    hero: HeroProps;
    header: HeaderProps;
  }[];
};

type HomepageData = {
  pageBuilder: PageBuilder;
};

const query = `*[_type == $pageType && slug.current == $slug] {
  pageBuilder {
    components[] {
      _type,
      _type == 'hero' => {
        _id,
        title,
        description,
        announcement,
        ctas[]{
          ctaText,
          href,
          type,
        }
      },
      _type == 'header' => {
        _id,
        eyebrow,
        title,
        description
      }
    }
  }
}[0]`;

export default async function Homepage() {
  const homepage = await sanityFetch<HomepageData>({
    query: query,
    params: {
      slug: 'homepage',
      pageType: 'page',
    },
    tags: ['homepage'],
  });

  return (
    <>
      <Nav />
      {/* <Hero /> */}
      {homepage.pageBuilder.components.map((component: any) => {
        if (component._type === 'hero') {
          return <Hero key={component._id} {...component} />;
        }
        if (component._type === 'header') {
          return <CenteredHeader key={component._id} {...component} />;
        }
        return null;
      })}
    </>
  );
}
