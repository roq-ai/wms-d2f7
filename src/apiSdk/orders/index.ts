import queryString from 'query-string';
import { OrderInterface, OrderGetQueryInterface } from 'interfaces/order';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getOrders = async (query?: OrderGetQueryInterface): Promise<PaginatedInterface<OrderInterface>> => {
  return fetcher('/api/orders', {}, query);
};

export const createOrder = async (order: OrderInterface) => {
  return fetcher('/api/orders', { method: 'POST', body: JSON.stringify(order) });
};

export const updateOrderById = async (id: string, order: OrderInterface) => {
  return fetcher(`/api/orders/${id}`, { method: 'PUT', body: JSON.stringify(order) });
};

export const getOrderById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/orders/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteOrderById = async (id: string) => {
  return fetcher(`/api/orders/${id}`, { method: 'DELETE' });
};
