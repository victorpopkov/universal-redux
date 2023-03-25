import React from 'react';
import PropTypes from 'prop-types';
import styles from './GitHub.scss';

const GitHub = ({ githubRef }) => (
  <div className={styles.github}>
    <a
      aria-label={`Star ${githubRef} on GitHub`}
      className="github-button"
      data-icon="octicon-star"
      data-show-count="true"
      data-size="large"
      href={`https://github.com/${githubRef}`}
    >
      Star
    </a>
    <a
      aria-label={`Watch ${githubRef} on GitHub`}
      className="github-button"
      data-icon="octicon-eye"
      data-show-count="true"
      data-size="large"
      href={`https://github.com/${githubRef}/subscription`}
    >
      Watch
    </a>
  </div>
);

GitHub.propTypes = {
  githubRef: PropTypes.string,
};

GitHub.defaultProps = {
  githubRef: null,
};

export default GitHub;
