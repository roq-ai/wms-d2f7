import * as yup from 'yup';

export const inventoryValidationSchema = yup.object().shape({
  last_checked: yup.date().nullable(),
  last_updated: yup.date().nullable(),
  quantity_on_hand: yup.number().integer().required(),
  expiration_date: yup.date().nullable(),
  product_id: yup.number().integer().required(),
  location_id: yup.number().integer().nullable(),
  reorder_threshold: yup.number().integer().nullable(),
});
