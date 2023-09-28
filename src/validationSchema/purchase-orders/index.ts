import * as yup from 'yup';

export const purchaseOrderValidationSchema = yup.object().shape({
  expected_delivery_date: yup.date().nullable(),
  order_status: yup.string().nullable(),
  delivery_notes: yup.string().nullable(),
});
