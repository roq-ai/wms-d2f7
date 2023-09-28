import { GetQueryInterface } from 'interfaces';

export interface InventoryInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;
  last_checked?: any;
  last_updated?: any;
  quantity_on_hand: number;
  expiration_date?: any;
  product_id: number;
  location_id?: number;
  reorder_threshold?: number;

  _count?: {};
}

export interface InventoryGetQueryInterface extends GetQueryInterface {
  id?: string;
}
