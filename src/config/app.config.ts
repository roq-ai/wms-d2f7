interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Owner'],
  customerRoles: [],
  tenantRoles: ['Owner', 'Manager', 'Inventory Clerk', 'Shipping Coordinator', 'Customer'],
  tenantName: 'Company',
  applicationName: 'WMS',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [],
  ownerAbilities: [
    'Manage product categories',
    'Manage purchase orders',
    'Manage orders',
    'Manage shipments',
    'Manage products',
    'Manage inventory',
    'Manage warehouses',
    'Manage users',
    'Manage companies',
  ],
  getQuoteUrl: 'https://app.roq.ai/proposal/752da5b7-1da7-46ae-b952-45dd9141925c',
};
