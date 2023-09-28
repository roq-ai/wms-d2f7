import * as yup from 'yup';

export const shipmentValidationSchema = yup.object().shape({
  estimated_delivery_date: yup.date().nullable(),
  tracking_number: yup.string().nullable(),
  shipment_status: yup.string().nullable(),
  carrier_name: yup.string().nullable(),
  shipment_cost: yup.number().nullable(),
});
