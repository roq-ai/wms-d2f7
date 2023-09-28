import queryString from 'query-string';
import { ProductCategoryInterface, ProductCategoryGetQueryInterface } from 'interfaces/product-category';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getProductCategories = async (
  query?: ProductCategoryGetQueryInterface,
): Promise<PaginatedInterface<ProductCategoryInterface>> => {
  return fetcher('/api/product-categories', {}, query);
};

export const createProductCategory = async (productCategory: ProductCategoryInterface) => {
  return fetcher('/api/product-categories', { method: 'POST', body: JSON.stringify(productCategory) });
};

export const updateProductCategoryById = async (id: string, productCategory: ProductCategoryInterface) => {
  return fetcher(`/api/product-categories/${id}`, { method: 'PUT', body: JSON.stringify(productCategory) });
};

export const getProductCategoryById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/product-categories/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteProductCategoryById = async (id: string) => {
  return fetcher(`/api/product-categories/${id}`, { method: 'DELETE' });
};
