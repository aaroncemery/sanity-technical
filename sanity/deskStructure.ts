import { StructureBuilder } from 'sanity/structure';
import { Presentation } from 'lucide-react';

export const customStructure = (S: StructureBuilder) =>
  S.list()
    .title('Presentations')
    .items([
      S.documentTypeListItem('presentation')
        .title('Presentations')
        .icon(Presentation),
    ]);
