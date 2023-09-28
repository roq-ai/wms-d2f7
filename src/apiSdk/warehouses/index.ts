import queryString from 'query-string';
import { WarehouseInterface, WarehouseGetQueryInterface } from 'interfaces/warehouse';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getWarehouses = async (
  query?: WarehouseGetQueryInterface,
): Promise<PaginatedInterface<WarehouseInterface>> => {
  return fetcher('/api/warehouses', {}, query);
};

export const createWarehouse = async (warehouse: WarehouseInterface) => {
  return fetcher('/api/warehouses', { method: 'POST', body: JSON.stringify(warehouse) });
};

export const updateWarehouseById = async (id: string, warehouse: WarehouseInterface) => {
  return fetcher(`/api/warehouses/${id}`, { method: 'PUT', body: JSON.stringify(warehouse) });
};

export const getWarehouseById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/warehouses/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteWarehouseById = async (id: string) => {
  return fetcher(`/api/warehouses/${id}`, { method: 'DELETE' });
};
