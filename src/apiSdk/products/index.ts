import queryString from 'query-string';
import { ProductInterface, ProductGetQueryInterface } from 'interfaces/product';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getProducts = async (query?: ProductGetQueryInterface): Promise<PaginatedInterface<ProductInterface>> => {
  return fetcher('/api/products', {}, query);
};

export const createProduct = async (product: ProductInterface) => {
  return fetcher('/api/products', { method: 'POST', body: JSON.stringify(product) });
};

export const updateProductById = async (id: string, product: ProductInterface) => {
  return fetcher(`/api/products/${id}`, { method: 'PUT', body: JSON.stringify(product) });
};

export const getProductById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/products/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteProductById = async (id: string) => {
  return fetcher(`/api/products/${id}`, { method: 'DELETE' });
};
