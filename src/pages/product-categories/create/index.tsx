import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createProductCategory } from 'apiSdk/product-categories';
import { productCategoryValidationSchema } from 'validationSchema/product-categories';
import { ProductCategoryInterface } from 'interfaces/product-category';

function ProductCategoryCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ProductCategoryInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createProductCategory(values);
      resetForm();
      router.push('/product-categories');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ProductCategoryInterface>({
    initialValues: {
      description: '',
      parent_category_id: 0,
      category_code: '',
      category_image_url: '',
    },
    validationSchema: productCategoryValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Product Categories',
              link: '/product-categories',
            },
            {
              label: 'Create Product Category',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Product Category
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.description}
            label={'Description'}
            props={{
              name: 'description',
              placeholder: 'Description',
              value: formik.values?.description,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Parent Category Id"
            formControlProps={{
              id: 'parent_category_id',
              isInvalid: !!formik.errors?.parent_category_id,
            }}
            name="parent_category_id"
            error={formik.errors?.parent_category_id}
            value={formik.values?.parent_category_id}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('parent_category_id', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <TextInput
            error={formik.errors.category_code}
            label={'Category Code'}
            props={{
              name: 'category_code',
              placeholder: 'Category Code',
              value: formik.values?.category_code,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.category_image_url}
            label={'Category Image Url'}
            props={{
              name: 'category_image_url',
              placeholder: 'Category Image Url',
              value: formik.values?.category_image_url,
              onChange: formik.handleChange,
            }}
          />

          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/product-categories')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'product_category',
    operation: AccessOperationEnum.CREATE,
  }),
)(ProductCategoryCreatePage);
