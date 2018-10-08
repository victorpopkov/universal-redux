import './Footer.scss';
import React from 'react';
import packageJson from '../../../../package.json';

const Footer = () => (
  <footer className="footer" styleName="footer">
    <div className="container">
      <ul>
        <li><a href={`https://github.com/victorpopkov/${packageJson.name}`}>View on GitHub</a></li>
      </ul>
      <div styleName="buttons">
        <iframe
          frameBorder="0"
          height="20px"
          scrolling="0"
          src={`https://ghbtns.com/github-btn.html?user=victorpopkov&repo=${packageJson.name}&type=star&count=true`}
          title="GitHub Stars"
          width="80px"
        />
        <iframe
          frameBorder="0"
          height="20px"
          scrolling="0"
          src={`https://ghbtns.com/github-btn.html?user=victorpopkov&repo=${packageJson.name}&type=watch&count=true&v=2`}
          title="GitHub Watchers"
          width="90px"
        />
      </div>
    </div>
  </footer>
);

export default Footer;
