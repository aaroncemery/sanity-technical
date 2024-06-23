import { PortableTextBlock } from 'next-sanity';
import { client } from '../../../../sanity/lib/client';

type Slide = {
  title: string;
  description: PortableTextBlock[];
  image: string;
  titleSlide: boolean;
};

type Presentation = {
  _id: string;
  title: string;
  description: PortableTextBlock[];
  slides: Slide[];
};

export default async function Page({ params }: { params: { slug: string } }) {
  const presentation = await client.fetch<Presentation>(
    `*[_type == "presentation" && slug.current == $slug][0] {
        title,
        description,
        slides,
  }`,
    {
      slug: params.slug,
    }
  );

  console.log(presentation.title);

  return <div>My Post: {presentation.title}</div>;
}
