import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Kataput Interview Test',
  tagline: 'A Docusaurus Setup for Katapult Interview',

  url: 'https://katapult-test.github.io/',
  baseUrl: '/katapult-test/',

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
          sidebarCollapsed: true,
          routeBasePath: '/',
          showLastUpdateTime: true,
        }
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'Katapult Interview Test',
      items: [
        {
          type: 'doc',
          position: 'left',
          docId: 'introduction',
          label: 'Introduction',
        },
        {
          type: 'docSidebar',
          sidebarId: 'main',
          position: 'left',
          label: 'Take Home Test',
        },
      ],
    },

    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },

    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },

    themes: ['@docusaurus/theme-mermaid'],

    markdown: {
      mermaid: true,
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
