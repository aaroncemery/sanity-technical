import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { token } from '../../../../sanity/env';
import { getPostBySlug } from '../../../../sanity/lib/queries';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');
  const pageType = searchParams.get('pageType');

  if (secret !== token || !slug || !pageType) {
    return new Response('Invalid token', { status: 401 });
  }

  const post = await getPostBySlug(slug, pageType);

  console.log('post', post);

  if (!post) {
    return new Response('Post not found', { status: 404 });
  }

  draftMode().enable();

  redirect(`/${pageType}/${post.slug}`);
}
