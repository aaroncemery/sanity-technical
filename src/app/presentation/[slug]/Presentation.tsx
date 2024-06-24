import { PortableTextBlock, SanityImageAssetDocument } from 'next-sanity';
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

export const query = `*[_type == "presentation" && slug.current == $slug][0] {
        title,
        description,
        brandLogo,
        slides,
  }`;

export default function Presentation({ data }: { data: Presentation }) {
  return (
    <div className='flex h-[calc(100vh-80px)] min-w-screen flex-col items-center justify-between bg-[#121923] text-white mt-20'>
      <div className='z-10 h-screen w-screen items-center justify-between font-mono text-sm'>
        <Slides slides={data.slides} brandLogo={data.brandLogo} />
      </div>
    </div>
  );
}
