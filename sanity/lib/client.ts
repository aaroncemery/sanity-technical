import 'server-only';

import { createClient, type QueryOptions, type QueryParams } from 'next-sanity';
import { draftMode } from 'next/headers';

import { apiVersion, dataset, projectId, useCdn, token } from '../env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  perspective: 'published',
});

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags,
}: {
  query: string;
  params?: QueryParams;
  tags: string[];
}) {
  const isDraftMode = draftMode().isEnabled;
  if (isDraftMode && !token) {
    throw new Error(
      'The `SECRET_SANITY_PREVIEW_TOKEN` environment variable is required.'
    );
  }

  const REVALIDATE_SKIP_CACHE = 0;
  const REVALIDATE_CACHE_FOREVER = false;

  return client.fetch<QueryResponse>(query, params, {
    ...(isDraftMode &&
      ({
        token: token,
        perspective: 'previewDrafts',
      } satisfies QueryOptions)),
    next: {
      revalidate: isDraftMode
        ? REVALIDATE_SKIP_CACHE
        : REVALIDATE_CACHE_FOREVER,
      tags,
    },
  });
}
