'use client';

import { useState } from 'react';
import { PortableTextBlock } from 'sanity';
import { TitleSlide, Slide } from './Slide';
import Image from 'next/image';
import { urlForImage } from '../../../../sanity/lib/image';
import { SanityImageAssetDocument } from 'next-sanity';

type Slide = {
  title: string;
  description: PortableTextBlock[];
  image: string;
  titleSlide: boolean;
};

const components = {
  block: {
    h1: ({ children }: any) => <h1 className='text-3xl'>{children}</h1>,
    normal: ({ children }: any) => <h1 className='text-lg'>{children}</h1>,
  },
};

export const Slides = ({
  slides,
  brandLogo,
}: {
  slides: any;
  brandLogo: SanityImageAssetDocument;
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  console.log(slides[currentSlide].image);

  return (
    <div className='grid grid-cols-5 gap-4 h-full w-full'>
      <div className='sidebar col-span-1 bg-white rounded-br-lg shadow-lg border-t border-gray-200'>
        <ul>
          {slides.map((slide: any, index: number) => (
            <li
              key={slide.title}
              className={`p-2 cursor-pointer rounded-md text-black transition-colors ${currentSlide === index ? 'bg-black text-white' : ''} ${!slide.titleSlide ? 'pl-4' : 'font-semibold'}`}
              onClick={() => goToSlide(index)}
            >
              {slide.title}
            </li>
          ))}
        </ul>
      </div>
      <div className='relative slide-container col-span-4'>
        <div
          className='relative w-full h-full py-24 px-10'
          key={slides[currentSlide].title}
        >
          {slides[currentSlide].titleSlide ? (
            <TitleSlide slide={slides[currentSlide]} />
          ) : (
            <Slide slide={slides[currentSlide]} />
          )}
        </div>
        <Image
          src={urlForImage(brandLogo)}
          alt={brandLogo.alt || 'Brand Logo'}
          width={brandLogo.asset.width || 100}
          height={brandLogo.asset.height || 100}
          priority
          className='absolute bottom-20 right-20'
        />
        <div className='navigation absolute bottom-4 right-1/2 translate-x-1/2 flex w-full justify-between pr-4 max-w-3xl mx-auto'>
          <button disabled={currentSlide === 0} onClick={prevSlide}>
            Previous
          </button>
          <button
            disabled={currentSlide === slides.length - 1}
            onClick={nextSlide}
          >
            Next
          </button>
        </div>
      </div>
      <style jsx>{`
        .presentation-container {
          display: flex;
        }
        .sidebar {
          padding: 10px;
          border-right: 1px solid #ccc;
        }
        .sidebar ul {
          list-style-type: none;
          padding: 0;
        }
        .slide-container {
          flex-grow: 1;
          padding: 20px;
        }
        .slide {
          text-align: center;
        }
      `}</style>
    </div>
  );
};
