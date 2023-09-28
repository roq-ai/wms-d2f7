import { GetQueryInterface } from 'interfaces';

export interface ProductInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;
  product_description?: string;
  product_weight?: number;
  product_dimensions?: string;
  product_material?: string;
  product_color?: string;
  product_category?: string;
  product_manufacturer?: string;
  product_price?: number;

  _count?: {};
}

export interface ProductGetQueryInterface extends GetQueryInterface {
  id?: string;
  product_description?: string;
  product_dimensions?: string;
  product_material?: string;
  product_color?: string;
  product_category?: string;
  product_manufacturer?: string;
}
