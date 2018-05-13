/* eslint-disable react/no-danger */
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';
import serialize from 'serialize-javascript';

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
const Html = ({ assets, component, store }) => {
  const head = Helmet.rewind();

  return (
    <html lang="en">
      <head>
        {head.base.toComponent()}
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {/* styles (will be present only in production with webpack extract text plugin) */}
        {Object.keys(assets.styles).map((style, key) => (
          <link
            href={assets.styles[style]}
            key={key} // eslint-disable-line react/no-array-index-key
            media="screen, projection"
            rel="stylesheet"
            type="text/css"
          />
        ))}
        {head.link.toComponent()}
        {head.script.toComponent()}
      </head>
      <body>
        <div dangerouslySetInnerHTML={{ __html: component }} id="content" />
        <script dangerouslySetInnerHTML={{ __html: `window.__PRELOADED_STATE__=${serialize(store.getState())};` }} />
        {Object.keys(assets.javascript).map((js, key) => (
          <script
            key={key} // eslint-disable-line react/no-array-index-key
            src={assets.javascript[js]}
          />
        ))}
      </body>
    </html>
  );
};

Html.propTypes = {
  assets: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  component: PropTypes.node,
  store: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

Html.defaultProps = {
  assets: null,
  component: null,
  store: null,
};

export default Html;
