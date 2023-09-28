import { GetQueryInterface } from 'interfaces';

export interface OrderInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;
  order_status?: string;
  delivery_date?: any;
  estimated_delivery_date?: any;
  order_tracking_number?: string;
  order_priority?: string;

  _count?: {};
}

export interface OrderGetQueryInterface extends GetQueryInterface {
  id?: string;
  order_status?: string;
  order_tracking_number?: string;
  order_priority?: string;
}
