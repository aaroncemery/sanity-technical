import { createClient, type QueryOptions, type QueryParams } from 'next-sanity';

import { apiVersion, dataset, projectId, useCdn, token } from '../env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  perspective: 'published',
});
