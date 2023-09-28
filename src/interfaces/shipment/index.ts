import { GetQueryInterface } from 'interfaces';

export interface ShipmentInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;
  estimated_delivery_date?: any;
  tracking_number?: string;
  shipment_status?: string;
  carrier_name?: string;
  shipment_cost?: number;

  _count?: {};
}

export interface ShipmentGetQueryInterface extends GetQueryInterface {
  id?: string;
  tracking_number?: string;
  shipment_status?: string;
  carrier_name?: string;
}
