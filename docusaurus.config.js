// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
require('dotenv').config();

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'byron.wiki',
  url: 'https://portal.byronsolutions.com/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  customFields: {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
  },

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'byron.solutions', // Usually your GitHub org/user name.
  projectName: 'byron-wiki', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'pt-br',
    locales: ['pt-br'],
  },

  plugins: [
    [
      'docusaurus2-dotenv',
      {
        path: './.env',
      },
    ],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/wiki/',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/fabioavf/byron-wiki/blob/main',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/fabioavf/byron-wiki/blob/main',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        logo: {
          alt: 'Logo da byron.solutions',
          src: 'img/byron.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'byron-docs/guia/index',
            position: 'left',
            label: 'Documentação',
          },
          {
            type: 'doc',
            docId: 'byron-courses/basico/web-fundamentos/index',
            position: 'left',
            label: 'Capacitações',
          },
          {
            href: 'http://mattermost.byronsolutions.com/',
            label: 'Mattermost',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'Mattermost',
          },
        ],
      },
      footer: {
        style: 'light',
        logo: {
          alt: 'Logo da byron.solutions',
          src: 'img/byron.png',
        },
        copyright: `Copyright © ${new Date().getFullYear()} | byron.solutions | Feito com Docusaurus`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
