import React from 'react';
import Preview from './preview/components/Preview';
import { stories } from './configure';

// export configuration API functions
export { configure } from './configure/';
export { storiesOf } from './configure/';

// export the function to generate the preview component
export function PreviewComponent({port, host = 'localhost'}) {
  return () => <Preview address={`${host}:${port}`} stories={stories} />;
}
