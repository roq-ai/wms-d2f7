import * as yup from 'yup';

export const orderValidationSchema = yup.object().shape({
  order_status: yup.string().nullable(),
  delivery_date: yup.date().nullable(),
  estimated_delivery_date: yup.date().nullable(),
  order_tracking_number: yup.string().nullable(),
  order_priority: yup.string().nullable(),
});
