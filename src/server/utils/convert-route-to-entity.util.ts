const mapping: Record<string, string> = {
  companies: 'company',
  inventories: 'inventory',
  orders: 'order',
  products: 'product',
  'product-categories': 'product_category',
  'purchase-orders': 'purchase_order',
  shipments: 'shipment',
  users: 'user',
  warehouses: 'warehouse',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
