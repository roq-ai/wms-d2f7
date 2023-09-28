import queryString from 'query-string';
import { PurchaseOrderInterface, PurchaseOrderGetQueryInterface } from 'interfaces/purchase-order';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getPurchaseOrders = async (
  query?: PurchaseOrderGetQueryInterface,
): Promise<PaginatedInterface<PurchaseOrderInterface>> => {
  return fetcher('/api/purchase-orders', {}, query);
};

export const createPurchaseOrder = async (purchaseOrder: PurchaseOrderInterface) => {
  return fetcher('/api/purchase-orders', { method: 'POST', body: JSON.stringify(purchaseOrder) });
};

export const updatePurchaseOrderById = async (id: string, purchaseOrder: PurchaseOrderInterface) => {
  return fetcher(`/api/purchase-orders/${id}`, { method: 'PUT', body: JSON.stringify(purchaseOrder) });
};

export const getPurchaseOrderById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/purchase-orders/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deletePurchaseOrderById = async (id: string) => {
  return fetcher(`/api/purchase-orders/${id}`, { method: 'DELETE' });
};
