/* eslint-disable react/no-danger */
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';

const removeWhitespaces = (content) =>
  content
    .replace(/>\s+</g, '><')
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\s+<\//g, '</');

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
        {Object.keys(assets.styles).map((style, key) => (
          <link
            href={assets.styles[style]}
            key={key} // eslint-disable-line react/no-array-index-key
            rel="stylesheet"
          />
        ))}
        {head.link.toComponent()}
        {head.script.toComponent()}
      </head>
      <body>
        <div dangerouslySetInnerHTML={{ __html: component }} id="content" />
        <script async defer src="https://buttons.github.io/buttons.js" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__PRELOADED_STATE__=${JSON.stringify(
              store.getState().toJS(),
            )};`,
          }}
        />
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

export { removeWhitespaces };
