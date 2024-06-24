import { type DefaultDocumentNodeResolver } from 'sanity/structure';
import { Iframe } from 'sanity-plugin-iframe-pane';
import { type SanityDocument } from 'sanity';
import { token } from './env';

const secret = process.env.NEXT_PUBLIC_SANITY_TOKEN || token;

function getPreviewUrl(doc: SanityDocument) {
  const slug = doc?.slug as { current: string };
  return slug?.current
    ? `/api/draft?secret=${secret}&slug=${slug.current}&pageType=${doc._type}`
    : `${window.location.host}`;
}

export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType }
) => {
  // Only show preview pane on `movie` schema type documents
  switch (schemaType) {
    case `presentation`:
      return S.document().views([
        S.view.form(),
        S.view
          .component(Iframe)
          .options({
            url: (doc: SanityDocument) => getPreviewUrl(doc),
          })
          .title('Preview'),
      ]);
    default:
      return S.document().views([S.view.form()]);
  }
};
