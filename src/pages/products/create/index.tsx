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

import { createProduct } from 'apiSdk/products';
import { productValidationSchema } from 'validationSchema/products';
import { ProductInterface } from 'interfaces/product';

function ProductCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ProductInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createProduct(values);
      resetForm();
      router.push('/products');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ProductInterface>({
    initialValues: {
      product_description: '',
      product_weight: 0,
      product_dimensions: '',
      product_material: '',
      product_color: '',
      product_category: '',
      product_manufacturer: '',
      product_price: 0,
    },
    validationSchema: productValidationSchema,
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
              label: 'Products',
              link: '/products',
            },
            {
              label: 'Create Product',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Product
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.product_description}
            label={'Product Description'}
            props={{
              name: 'product_description',
              placeholder: 'Product Description',
              value: formik.values?.product_description,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Product Weight"
            formControlProps={{
              id: 'product_weight',
              isInvalid: !!formik.errors?.product_weight,
            }}
            name="product_weight"
            error={formik.errors?.product_weight}
            value={formik.values?.product_weight}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('product_weight', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <TextInput
            error={formik.errors.product_dimensions}
            label={'Product Dimensions'}
            props={{
              name: 'product_dimensions',
              placeholder: 'Product Dimensions',
              value: formik.values?.product_dimensions,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.product_material}
            label={'Product Material'}
            props={{
              name: 'product_material',
              placeholder: 'Product Material',
              value: formik.values?.product_material,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.product_color}
            label={'Product Color'}
            props={{
              name: 'product_color',
              placeholder: 'Product Color',
              value: formik.values?.product_color,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.product_category}
            label={'Product Category'}
            props={{
              name: 'product_category',
              placeholder: 'Product Category',
              value: formik.values?.product_category,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.product_manufacturer}
            label={'Product Manufacturer'}
            props={{
              name: 'product_manufacturer',
              placeholder: 'Product Manufacturer',
              value: formik.values?.product_manufacturer,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Product Price"
            formControlProps={{
              id: 'product_price',
              isInvalid: !!formik.errors?.product_price,
            }}
            name="product_price"
            error={formik.errors?.product_price}
            value={formik.values?.product_price}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('product_price', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
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
              onClick={() => router.push('/products')}
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
    entity: 'product',
    operation: AccessOperationEnum.CREATE,
  }),
)(ProductCreatePage);