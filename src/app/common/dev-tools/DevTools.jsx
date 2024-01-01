import DockMonitor from 'redux-devtools-dock-monitor'; // eslint-disable-line import/no-extraneous-dependencies
import LogMonitor from 'redux-devtools-log-monitor'; // eslint-disable-line import/no-extraneous-dependencies
import React from 'react';
import { createDevTools } from 'redux-devtools'; // eslint-disable-line import/no-extraneous-dependencies

export default createDevTools(
  <DockMonitor changePositionKey="ctrl-Q" toggleVisibilityKey="ctrl-H">
    <LogMonitor />
  </DockMonitor>,
);
