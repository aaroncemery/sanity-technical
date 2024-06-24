'use client';

import LiveQueryProvider from 'next-sanity/preview';
import { suspend } from 'suspend-react';

// suspend-react cache is global, so we use a unique key to avoid collisions
const UniqueKey = Symbol('../../../sanity/lib/client');

export default function PreviewProvider({
  children,
  token,
}: {
  children: React.ReactNode;
  token?: string;
}) {
  const { client } = suspend(
    () => import('../../../sanity/lib/client'),
    [UniqueKey]
  );
  if (!token) throw new TypeError('Missing token');
  return (
    <LiveQueryProvider client={client} token={token} logger={console}>
      {children}
    </LiveQueryProvider>
  );
}
