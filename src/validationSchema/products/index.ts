import * as yup from 'yup';

export const productValidationSchema = yup.object().shape({
  product_description: yup.string().nullable(),
  product_weight: yup.number().nullable(),
  product_dimensions: yup.string().nullable(),
  product_material: yup.string().nullable(),
  product_color: yup.string().nullable(),
  product_category: yup.string().nullable(),
  product_manufacturer: yup.string().nullable(),
  product_price: yup.number().nullable(),
});
