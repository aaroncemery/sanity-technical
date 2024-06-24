import { type SchemaTypeDefinition } from 'sanity';
import slide from './schemas/slide';
import presentation from './schemas/presentation';
import page from './schemas/page';
import pageBuilder from './schemas/pageBuilder';
import { components } from './schemas/components';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [...components, slide, presentation, page, pageBuilder],
};
