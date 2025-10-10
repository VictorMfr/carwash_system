import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'home',
    {
      type: 'category',
      label: 'Stock',
      items: [
        'modulos/stock',
        'modulos/stock/brand',
        'modulos/stock/product',
        'modulos/stock/state',
      ],
    },
    {
      type: 'category',
      label: 'Service',
      items: [
        'modulos/service',
        'modulos/service/vehicle',
        'modulos/service/operator',
        'modulos/service/recipe',
      ],
    },
    {
      type: 'category',
      label: 'Finance',
      items: [
        'modulos/finance',
      ],
    },
    {
      type: 'category',
      label: 'Users',
      items: [
        'modulos/user',
        'modulos/roles',
      ],
    },
    'modulos/marketing',
    'modulos/notification',
    'modulos/client',
  ],
};

export default sidebars;
