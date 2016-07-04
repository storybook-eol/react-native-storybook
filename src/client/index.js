import React from 'react';
import Preview from './preview/components/Preview';
import { stories } from './configure';
import { actions } from './configure';

// export configuration API functions
export { action } from './configure/';
export { addDecorator } from './configure/';
export { setAddon } from './configure/';
export { configure } from './configure/';
export { storiesOf } from './configure/';

// export the function to generate the preview component
export function getStorybookUI({port, host = 'localhost'}) {
  return () => <Preview address={`ws://${host}:${port}`} stories={stories} actions={actions} />;
}

// for the backward compatibility
export const PreviewComponent = getStorybookUI;
export const StorybookUI = getStorybookUI;
