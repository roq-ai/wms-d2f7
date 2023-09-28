import * as yup from 'yup';

export const warehouseValidationSchema = yup.object().shape({
  location: yup.string().nullable(),
  capacity: yup.number().integer().nullable(),
  manager_id: yup.number().integer().nullable(),
  warehouse_type: yup.string().nullable(),
  operational_hours: yup.string().nullable(),
});
