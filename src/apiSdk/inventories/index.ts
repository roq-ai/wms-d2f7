import queryString from 'query-string';
import { InventoryInterface, InventoryGetQueryInterface } from 'interfaces/inventory';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getInventories = async (
  query?: InventoryGetQueryInterface,
): Promise<PaginatedInterface<InventoryInterface>> => {
  return fetcher('/api/inventories', {}, query);
};

export const createInventory = async (inventory: InventoryInterface) => {
  return fetcher('/api/inventories', { method: 'POST', body: JSON.stringify(inventory) });
};

export const updateInventoryById = async (id: string, inventory: InventoryInterface) => {
  return fetcher(`/api/inventories/${id}`, { method: 'PUT', body: JSON.stringify(inventory) });
};

export const getInventoryById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/inventories/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteInventoryById = async (id: string) => {
  return fetcher(`/api/inventories/${id}`, { method: 'DELETE' });
};
