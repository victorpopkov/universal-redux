import { Badge } from 'reactstrap';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import styles from './Version.scss';

const Version = ({
  className,
  color,
  githubRef,
  revision,
  title,
  version,
  versionClassName,
}) => (
  <div className={classNames(styles.version, className)}>
    <Badge
      color="light"
      className={classNames(styles.name, 'align-middle', 'text-dark')}
    >
      {title ? `${title}` : 'Version'}
    </Badge>
    <Badge
      color={color}
      className={classNames(styles.value, 'align-middle', versionClassName)}
    >
      {version}
    </Badge>
    {revision && ` `}
    {revision && (
      <Badge
        color="light"
        className={classNames(
          styles.revision,
          'align-middle',
          versionClassName,
        )}
      >
        <a
          href={`https://github.com/${githubRef}/commit/${revision}`}
          rel="noreferrer"
          target="_blank"
        >
          {revision.substring(0, 7)}
        </a>
      </Badge>
    )}
  </div>
);

Version.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  githubRef: PropTypes.string,
  revision: PropTypes.string,
  title: PropTypes.string,
  version: PropTypes.string,
  versionClassName: PropTypes.string,
};

Version.defaultProps = {
  className: null,
  color: 'secondary',
  githubRef: null,
  revision: null,
  title: null,
  version: null,
  versionClassName: null,
};

export default Version;
