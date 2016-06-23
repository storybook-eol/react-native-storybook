import React from 'react';
import Preview from './preview/components/Preview';
import { stories } from './configure';

// export configuration API functions
export { addDecorator } from './configure/';
export { setAddon } from './configure/';
export { configure } from './configure/';
export { storiesOf } from './configure/';

// export the function to generate the preview component
export function PreviewComponent({port, host = 'localhost'}) {
  return () => <Preview address={`ws://${host}:${port}`} stories={stories} />;
}
