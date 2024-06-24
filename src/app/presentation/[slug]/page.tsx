import { PortableTextBlock, SanityImageAssetDocument } from 'next-sanity';
import { sanityFetch } from '../../../../sanity/lib/sanity.fetch';
import Presentation, { query } from './Presentation';
import { draftMode } from 'next/headers';
import { LiveQuery } from 'next-sanity/preview/live-query';
import PreviewPresentation from './PreviewPresentation';

type Slide = {
  title: string;
  description: PortableTextBlock[];
  image: SanityImageAssetDocument;
  titleSlide: boolean;
};

type PresentationData = {
  _id: string;
  title: string;
  description: any;
  brandLogo: SanityImageAssetDocument;
  slides: Slide[];
};

const components = {
  block: {
    h1: ({ children }: any) => <h1 className='text-3xl'>{children}</h1>,
    normal: ({ children }: any) => <h1 className='text-lg'>{children}</h1>,
  },
};

export default async function Page({ params }: { params: { slug: string } }) {
  const presentation = await sanityFetch<PresentationData>({
    query: query,
    params: {
      slug: params.slug,
    },
    tags: ['presentation'],
  });

  return (
    <LiveQuery
      enabled={draftMode().isEnabled}
      query={query}
      params={{ slug: params.slug }}
      initialData={presentation}
      as={PreviewPresentation}
    >
      <Presentation data={presentation} />
    </LiveQuery>
  );
}
