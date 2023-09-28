import queryString from 'query-string';
import { ShipmentInterface, ShipmentGetQueryInterface } from 'interfaces/shipment';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getShipments = async (
  query?: ShipmentGetQueryInterface,
): Promise<PaginatedInterface<ShipmentInterface>> => {
  return fetcher('/api/shipments', {}, query);
};

export const createShipment = async (shipment: ShipmentInterface) => {
  return fetcher('/api/shipments', { method: 'POST', body: JSON.stringify(shipment) });
};

export const updateShipmentById = async (id: string, shipment: ShipmentInterface) => {
  return fetcher(`/api/shipments/${id}`, { method: 'PUT', body: JSON.stringify(shipment) });
};

export const getShipmentById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/shipments/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteShipmentById = async (id: string) => {
  return fetcher(`/api/shipments/${id}`, { method: 'DELETE' });
};
