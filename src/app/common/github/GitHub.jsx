import React from 'react';
import config from '@Config';
import styles from './GitHub.scss';

const GitHub = () => (
  <div className={styles.github}>
    <a
      aria-label={`Star victorpopkov/${config.package.name} on GitHub`}
      className="github-button"
      data-icon="octicon-star"
      data-show-count="true"
      data-size="large"
      href={`https://github.com/victorpopkov/${config.package.name}`}
    >
      Star
    </a>
    <a
      aria-label={`Watch victorpopkov/${config.package.name} on GitHub`}
      className="github-button"
      data-icon="octicon-eye"
      data-show-count="true"
      data-size="large"
      href={`https://github.com/victorpopkov/${config.package.name}/subscription`}
    >
      Watch
    </a>
  </div>
);

export default GitHub;
