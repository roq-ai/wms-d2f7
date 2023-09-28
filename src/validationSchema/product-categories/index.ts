import * as yup from 'yup';

export const productCategoryValidationSchema = yup.object().shape({
  description: yup.string().nullable(),
  parent_category_id: yup.number().integer().nullable(),
  category_code: yup.string().nullable(),
  category_image_url: yup.string().nullable(),
});
