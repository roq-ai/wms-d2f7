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

import { createWarehouse } from 'apiSdk/warehouses';
import { warehouseValidationSchema } from 'validationSchema/warehouses';
import { WarehouseInterface } from 'interfaces/warehouse';

function WarehouseCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: WarehouseInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createWarehouse(values);
      resetForm();
      router.push('/warehouses');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<WarehouseInterface>({
    initialValues: {
      location: '',
      capacity: 0,
      manager_id: 0,
      warehouse_type: '',
      operational_hours: '',
    },
    validationSchema: warehouseValidationSchema,
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
              label: 'Warehouses',
              link: '/warehouses',
            },
            {
              label: 'Create Warehouse',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Warehouse
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.location}
            label={'Location'}
            props={{
              name: 'location',
              placeholder: 'Location',
              value: formik.values?.location,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Capacity"
            formControlProps={{
              id: 'capacity',
              isInvalid: !!formik.errors?.capacity,
            }}
            name="capacity"
            error={formik.errors?.capacity}
            value={formik.values?.capacity}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('capacity', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Manager Id"
            formControlProps={{
              id: 'manager_id',
              isInvalid: !!formik.errors?.manager_id,
            }}
            name="manager_id"
            error={formik.errors?.manager_id}
            value={formik.values?.manager_id}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('manager_id', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <TextInput
            error={formik.errors.warehouse_type}
            label={'Warehouse Type'}
            props={{
              name: 'warehouse_type',
              placeholder: 'Warehouse Type',
              value: formik.values?.warehouse_type,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.operational_hours}
            label={'Operational Hours'}
            props={{
              name: 'operational_hours',
              placeholder: 'Operational Hours',
              value: formik.values?.operational_hours,
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
              onClick={() => router.push('/warehouses')}
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
    entity: 'warehouse',
    operation: AccessOperationEnum.CREATE,
  }),
)(WarehouseCreatePage);
