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

import { createInventory } from 'apiSdk/inventories';
import { inventoryValidationSchema } from 'validationSchema/inventories';
import { InventoryInterface } from 'interfaces/inventory';

function InventoryCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: InventoryInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createInventory(values);
      resetForm();
      router.push('/inventories');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<InventoryInterface>({
    initialValues: {
      last_checked: new Date(new Date().toDateString()),
      last_updated: new Date(new Date().toDateString()),
      quantity_on_hand: 0,
      expiration_date: new Date(new Date().toDateString()),
      product_id: 0,
      location_id: 0,
      reorder_threshold: 0,
    },
    validationSchema: inventoryValidationSchema,
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
              label: 'Inventories',
              link: '/inventories',
            },
            {
              label: 'Create Inventory',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Inventory
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl id="last_checked" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Last Checked
            </FormLabel>
            <DatePicker
              selected={formik.values?.last_checked ? new Date(formik.values?.last_checked) : null}
              onChange={(value: Date) => formik.setFieldValue('last_checked', value)}
            />
          </FormControl>
          <FormControl id="last_updated" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Last Updated
            </FormLabel>
            <DatePicker
              selected={formik.values?.last_updated ? new Date(formik.values?.last_updated) : null}
              onChange={(value: Date) => formik.setFieldValue('last_updated', value)}
            />
          </FormControl>

          <NumberInput
            label="Quantity On Hand"
            formControlProps={{
              id: 'quantity_on_hand',
              isInvalid: !!formik.errors?.quantity_on_hand,
            }}
            name="quantity_on_hand"
            error={formik.errors?.quantity_on_hand}
            value={formik.values?.quantity_on_hand}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('quantity_on_hand', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <FormControl id="expiration_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Expiration Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.expiration_date ? new Date(formik.values?.expiration_date) : null}
              onChange={(value: Date) => formik.setFieldValue('expiration_date', value)}
            />
          </FormControl>

          <NumberInput
            label="Product Id"
            formControlProps={{
              id: 'product_id',
              isInvalid: !!formik.errors?.product_id,
            }}
            name="product_id"
            error={formik.errors?.product_id}
            value={formik.values?.product_id}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('product_id', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Location Id"
            formControlProps={{
              id: 'location_id',
              isInvalid: !!formik.errors?.location_id,
            }}
            name="location_id"
            error={formik.errors?.location_id}
            value={formik.values?.location_id}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('location_id', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Reorder Threshold"
            formControlProps={{
              id: 'reorder_threshold',
              isInvalid: !!formik.errors?.reorder_threshold,
            }}
            name="reorder_threshold"
            error={formik.errors?.reorder_threshold}
            value={formik.values?.reorder_threshold}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('reorder_threshold', Number.isNaN(valueNumber) ? 0 : valueNumber)
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
              onClick={() => router.push('/inventories')}
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
    entity: 'inventory',
    operation: AccessOperationEnum.CREATE,
  }),
)(InventoryCreatePage);
