import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Kataput Interview Test',
  tagline: 'A Docusaurus Setup for Katapult Interview',

  url: 'https://katapult-test.github.io/',
  baseUrl: '/',

  // GitHub pages deployment config.
  organizationName: 'hacktivist123',
  projectName: 'katapult-test',
  deploymentBranch: 'main',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
        }
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'Katapult Test',
      items: [],
    },
    footer: {
      style: 'dark',
      copyright: `Built with <a href="https://docusaurus.io/">Docusaurus</a>.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
