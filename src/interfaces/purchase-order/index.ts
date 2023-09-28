import { GetQueryInterface } from 'interfaces';

export interface PurchaseOrderInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;
  expected_delivery_date?: any;
  order_status?: string;
  delivery_notes?: string;

  _count?: {};
}

export interface PurchaseOrderGetQueryInterface extends GetQueryInterface {
  id?: string;
  order_status?: string;
  delivery_notes?: string;
}
