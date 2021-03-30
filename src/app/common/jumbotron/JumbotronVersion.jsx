import './Jumbotron.scss';
import { Badge } from 'reactstrap';
import React from 'react';
import { hot } from 'react-hot-loader';
import PropTypes from 'prop-types';

const JumbotronVersion = ({ className, name, revision, title, version }) => (
  <h6 className={className}>
    <span className="align-middle">
      {title ? `${title} version:` : 'Version:'}
    </span>
    {` `}
    <Badge className="align-middle">{version}</Badge>
    {revision && ` `}
    {revision && (
      <Badge color="light" className="align-middle">
        <a
          href={`https://github.com/victorpopkov/${name}/commit/${revision}`}
          rel="noreferrer"
          target="_blank"
        >
          {revision.substring(0, 7)}
        </a>
      </Badge>
    )}
  </h6>
);

JumbotronVersion.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  revision: PropTypes.string,
  title: PropTypes.string,
  version: PropTypes.string,
};

JumbotronVersion.defaultProps = {
  className: null,
  name: null,
  revision: null,
  title: null,
  version: null,
};

export default hot(module)(JumbotronVersion);
