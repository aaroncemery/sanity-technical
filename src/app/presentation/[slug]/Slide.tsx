import Image from 'next/image';
import { urlForImage } from '../../../../sanity/lib/image';
import { PortableText } from '@portabletext/react';
import { list } from 'postcss';

const components = {
  block: {
    h1: ({ children }: any) => <h1 className='text-5xl'>{children}</h1>,
    h3: ({ children }: any) => (
      <h3 className='text-3xl leading-snug font-sans font-light pt-9 pb-4'>
        {children}
      </h3>
    ),
    normal: ({ children }: any) => (
      <p className='text-5xl leading-snug font-sans font-light'>{children}</p>
    ),
  },
  marks: {
    em: ({ children }: any) => <em className='italic'>{children}</em>,
    strong: ({ children }: any) => (
      <strong className='font-semibold'>{children}</strong>
    ),
    code: ({ children }: any) => (
      <code className='text-sm font-mono'>{children}</code>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className='mt-xl'>{children}</ul>,
  },
  listItem: {
    // Ex. 1: customizing common list types
    bullet: ({ children }: any) => (
      <li className='list-disc list-inside text-xl leading-normal pb-4'>
        {children}
      </li>
    ),
  },
};

export const TitleSlide = (props: any) => {
  const { slide } = props;
  const imageUrl = slide.image && urlForImage(slide.image);

  return (
    <div className='flex flex-col justify-center h-full'>
      <h2 className='text-lg font-semibold font-sans'>{slide.title}</h2>
      <PortableText value={slide.description} components={components} />
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={slide.image.alt || 'Image'}
          width={slide.image.asset.width || 1000}
          height={slide.image.asset.height || 1000}
          className='object-cover rounded-lg'
          priority
        />
      )}
    </div>
  );
};

export const Slide = (props: any) => {
  const { slide } = props;

  return (
    <div className='grid grid-cols-3 gap-10 h-full w-full'>
      <div className='col-span-1 h-full w-full'>
        <h2>{slide.title}</h2>
        <PortableText value={slide.description} components={components} />
      </div>
      {slide.image && (
        <Image
          src={urlForImage(slide.image)}
          alt={slide.image.alt || 'Image'}
          width={slide.image.width || 750}
          height={slide.image.height || 750}
          className='object-contain rounded-lg col-span-2'
          priority
        />
      )}
    </div>
  );
};
