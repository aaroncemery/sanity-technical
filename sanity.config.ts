'use client';

import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './sanity/env';
import { schema } from './sanity/schema';
import { customStructure } from './sanity/deskStructure';
import { defaultDocumentNode } from './sanity/defaultDocumentNode';

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({ structure: customStructure, defaultDocumentNode }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
