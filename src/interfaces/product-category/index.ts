import { GetQueryInterface } from 'interfaces';

export interface ProductCategoryInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;
  description?: string;
  parent_category_id?: number;
  category_code?: string;
  category_image_url?: string;

  _count?: {};
}

export interface ProductCategoryGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  category_code?: string;
  category_image_url?: string;
}
