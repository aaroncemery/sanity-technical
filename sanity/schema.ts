import { type SchemaTypeDefinition } from 'sanity';
import slide from './schemas/slide';
import presentation from './schemas/presentation';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [slide, presentation],
};
