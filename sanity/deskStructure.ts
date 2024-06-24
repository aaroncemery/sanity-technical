import { StructureBuilder } from 'sanity/structure';
import { Presentation, File } from 'lucide-react';

export const customStructure = (S: StructureBuilder) =>
  S.list()
    .title('Documents')
    .items([
      S.documentTypeListItem('presentation')
        .title('Presentations')
        .icon(Presentation),
      S.documentTypeListItem('page').title('Pages').icon(File),
    ]);
