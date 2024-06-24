import { PortableTextBlock } from 'next-sanity';
import { PortableText } from '@portabletext/react';

export type HeaderProps = {
  eyebrow: string;
  title: string;
  description: PortableTextBlock[];
};

const components = {
  block: {
    normal: ({ children }: any) => (
      <h1 className='text-lg text-gray-50 leading-normal'>{children}</h1>
    ),
  },
  marks: {
    em: ({ children }: any) => <em className='italic'>{children}</em>,
    strong: ({ children }: any) => (
      <strong className='font-semibold'>{children}</strong>
    ),
    link: ({ children, value }: any) => {
      const { newTab, href } = value;
      return (
        <a
          href={href}
          className='text-pink-600 font-semibold hover:underline hover:cursor-pointer'
          target={newTab ? '_blank' : '_self'}
        >
          {children}
        </a>
      );
    },
  },
};

export default function CenteredHeader(props: HeaderProps) {
  const { eyebrow, title, description } = props;
  return (
    <div className='bg-slate-800 px-6 py-24 sm:py-32 lg:px-8'>
      <div className='mx-auto max-w-2xl text-center'>
        <p className='text-base font-semibold leading-7 text-pink-600'>
          {eyebrow}
        </p>
        <h2 className='mt-2 text-4xl font-bold tracking-tight text-gray-50 sm:text-6xl'>
          {title}
        </h2>
        <div className='mt-6'>
          <PortableText value={description} components={components} />
        </div>
      </div>
    </div>
  );
}
