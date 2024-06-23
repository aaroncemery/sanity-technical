import { client } from './client';

type PostSlug = {
  slug: string;
};

// Get a post by its slug
export async function getPostBySlug(slug: string, pageType: string = 'post') {
  const post = await client.fetch<PostSlug>(
    `*[_type == $pageType && slug.current == $slug][0] {
      'slug': slug.current,
    }`,
    {
      slug,
      pageType,
    }
  );

  return post;
}
