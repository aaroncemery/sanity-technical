import { PortableTextBlock, SanityImageAssetDocument } from 'next-sanity';
import { client } from '../../../../sanity/lib/client';
import { PortableText } from '@portabletext/react';
import { Slides } from './Slides';

type Slide = {
  title: string;
  description: PortableTextBlock[];
  image: SanityImageAssetDocument;
  titleSlide: boolean;
};

type Presentation = {
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
  const presentation = await client.fetch<Presentation>(
    `*[_type == "presentation" && slug.current == $slug][0] {
        title,
        description,
        brandLogo,
        slides,
  }`,
    {
      slug: params.slug,
    }
  );

  return (
    <div className='flex min-h-screen min-w-screen flex-col items-center justify-between bg-[#121923]'>
      <div className='z-10 h-screen w-screen items-center justify-between font-mono text-sm'>
        <Slides
          slides={presentation.slides}
          brandLogo={presentation.brandLogo}
        />
      </div>
    </div>
  );
}
