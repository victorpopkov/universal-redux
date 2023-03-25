import { Col, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import React from 'react';
import map from 'lodash/map';
import config from '@Config';
import SidebarBadge from './SidebarBadge';

const badges = [
  {
    alt: 'CI',
    href: `https://github.com/${config.package.githubRef}/actions/workflows/ci.yml`,
    path: `github/actions/workflow/status/${config.package.githubRef}/ci.yml`,
    args: {
      branch: 'main',
      label: 'ci',
    },
  },
  {
    alt: 'CD',
    href: `https://github.com/${config.package.githubRef}/actions/workflows/cd.yml`,
    path: `github/actions/workflow/status/${config.package.githubRef}/cd.yml`,
    args: {
      branch: 'main',
      label: 'cd',
    },
  },
  {
    alt: 'Code Climate',
    href: `https://codeclimate.com/github/${config.package.githubRef}`,
    path: `codeclimate/maintainability/${config.package.githubRef}`,
  },
  {
    alt: 'Libraries.io',
    href: `https://libraries.io/github/${config.package.githubRef}`,
    path: `librariesio/github/${config.package.githubRef}`,
  },
];

const Sidebar = () => (
  <Col className="d-none d-lg-block" md={3}>
    <h5 className="pb-2">Getting Started</h5>
    <Nav vertical>
      <NavItem>
        <NavLink tag={Link} to="/">
          Overview
        </NavLink>
      </NavItem>
    </Nav>
    <hr className="mb-4" />
    <h5 className="pb-2">Examples</h5>
    <Nav vertical>
      <NavItem>
        <NavLink tag={Link} to="/404">
          404 Not Found
        </NavLink>
      </NavItem>
    </Nav>
    <hr className="mb-4" />
    <h5 className="pb-2">Badges</h5>
    <Nav vertical>
      {map(badges, (entry, key) => (
        <SidebarBadge
          alt={entry.alt}
          args={entry.args}
          href={entry.href}
          key={`badge-${key}`}
          path={entry.path}
        />
      ))}
    </Nav>
  </Col>
);

export default Sidebar;
