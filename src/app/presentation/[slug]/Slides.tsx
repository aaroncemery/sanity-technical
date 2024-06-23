'use client';

import { useState } from 'react';
import { PortableTextBlock } from 'sanity';
import { PortableText } from '@portabletext/react';
import { urlForImage } from '../../../../sanity/lib/image';
import Image from 'next/image';

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

export const Slides = ({ slides }: { slides: any }) => {
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

  const imageUrl = urlForImage(slides[currentSlide].image);
  const imageWidth = slides[currentSlide].image.width;
  const imageHeight = slides[currentSlide].image.height;

  console.log('imageUrl', imageUrl);

  return (
    <div className='grid grid-cols-5 gap-4 h-full w-full'>
      <div className='sidebar col-span-1 bg-white rounded-tr-lg rounded-br-lg'>
        <ul>
          {slides.map((slide: any, index: number) => (
            <li
              key={slide.title}
              className={`p-2 cursor-pointer rounded-md text-black transition-colors ${currentSlide === index ? 'bg-black text-white' : ''}`}
              onClick={() => goToSlide(index)}
            >
              {slide.title}
            </li>
          ))}
        </ul>
      </div>
      <div className='relative slide-container col-span-4'>
        <div className='w-full h-full' key={slides[currentSlide].title}>
          <h2>{slides[currentSlide].title}</h2>
          <PortableText
            value={slides[currentSlide].description}
            components={components}
          />
          <Image
            src={imageUrl}
            alt={slides[currentSlide].image.alt}
            width={slides[currentSlide].image.asset.width || 100}
            height={slides[currentSlide].image.asset.height || 100}
            priority
          />
          <div className='navigation absolute bottom-0 right-0 flex w-full justify-between pr-4'>
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
