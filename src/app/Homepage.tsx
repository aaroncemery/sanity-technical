import { Hero, HeroProps } from './components/Hero';
import { sanityFetch } from '../../sanity/lib/sanity.fetch';

type PageBuilder = {
  components: {
    hero: HeroProps;
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
      {/* <Hero /> */}
      {homepage.pageBuilder.components.map((component: any) => {
        if (component._type === 'hero') {
          return <Hero key={component._id} {...component} />;
        }
        return null;
      })}
    </>
  );
}
