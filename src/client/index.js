import React from 'react';
import Preview from './preview/components/Preview';
import { stories } from './configure';

// export configuration API functions
export { configure } from './configure/';
export { storiesOf } from './configure/';

// export the preview container
export function PreviewContainer() {
  const address = 'localhost:9001';
  return <Preview address={address} stories={stories} />;
}
