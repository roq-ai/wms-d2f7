import { GetQueryInterface } from 'interfaces';

export interface WarehouseInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;
  location?: string;
  capacity?: number;
  manager_id?: number;
  warehouse_type?: string;
  operational_hours?: string;

  _count?: {};
}

export interface WarehouseGetQueryInterface extends GetQueryInterface {
  id?: string;
  location?: string;
  warehouse_type?: string;
  operational_hours?: string;
}
