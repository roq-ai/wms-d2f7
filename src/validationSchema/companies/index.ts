import * as yup from 'yup';

export const companyValidationSchema = yup.object().shape({
  description: yup.string().nullable(),
  image: yup.string().nullable(),
  name: yup.string().required(),
  company_size: yup.number().integer().nullable(),
  user_id: yup.string().nullable().required(),
});
