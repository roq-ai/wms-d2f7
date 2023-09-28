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
  Center,
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
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getPurchaseOrderById, updatePurchaseOrderById } from 'apiSdk/purchase-orders';
import { purchaseOrderValidationSchema } from 'validationSchema/purchase-orders';
import { PurchaseOrderInterface } from 'interfaces/purchase-order';

function PurchaseOrderEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<PurchaseOrderInterface>(
    () => (id ? `/purchase-orders/${id}` : null),
    () => getPurchaseOrderById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: PurchaseOrderInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updatePurchaseOrderById(id, values);
      mutate(updated);
      resetForm();
      router.push('/purchase-orders');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<PurchaseOrderInterface>({
    initialValues: data,
    validationSchema: purchaseOrderValidationSchema,
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
              label: 'Purchase Orders',
              link: '/purchase-orders',
            },
            {
              label: 'Update Purchase Order',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Purchase Order
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl id="expected_delivery_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Expected Delivery Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.expected_delivery_date ? new Date(formik.values?.expected_delivery_date) : null}
              onChange={(value: Date) => formik.setFieldValue('expected_delivery_date', value)}
            />
          </FormControl>

          <TextInput
            error={formik.errors.order_status}
            label={'Order Status'}
            props={{
              name: 'order_status',
              placeholder: 'Order Status',
              value: formik.values?.order_status,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.delivery_notes}
            label={'Delivery Notes'}
            props={{
              name: 'delivery_notes',
              placeholder: 'Delivery Notes',
              value: formik.values?.delivery_notes,
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
              onClick={() => router.push('/purchase-orders')}
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
    entity: 'purchase_order',
    operation: AccessOperationEnum.UPDATE,
  }),
)(PurchaseOrderEditPage);
