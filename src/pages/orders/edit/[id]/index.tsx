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
import { getOrderById, updateOrderById } from 'apiSdk/orders';
import { orderValidationSchema } from 'validationSchema/orders';
import { OrderInterface } from 'interfaces/order';

function OrderEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<OrderInterface>(
    () => (id ? `/orders/${id}` : null),
    () => getOrderById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: OrderInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateOrderById(id, values);
      mutate(updated);
      resetForm();
      router.push('/orders');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<OrderInterface>({
    initialValues: data,
    validationSchema: orderValidationSchema,
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
              label: 'Orders',
              link: '/orders',
            },
            {
              label: 'Update Order',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Order
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
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

          <FormControl id="delivery_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Delivery Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.delivery_date ? new Date(formik.values?.delivery_date) : null}
              onChange={(value: Date) => formik.setFieldValue('delivery_date', value)}
            />
          </FormControl>
          <FormControl id="estimated_delivery_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Estimated Delivery Date
            </FormLabel>
            <DatePicker
              selected={
                formik.values?.estimated_delivery_date ? new Date(formik.values?.estimated_delivery_date) : null
              }
              onChange={(value: Date) => formik.setFieldValue('estimated_delivery_date', value)}
            />
          </FormControl>

          <TextInput
            error={formik.errors.order_tracking_number}
            label={'Order Tracking Number'}
            props={{
              name: 'order_tracking_number',
              placeholder: 'Order Tracking Number',
              value: formik.values?.order_tracking_number,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.order_priority}
            label={'Order Priority'}
            props={{
              name: 'order_priority',
              placeholder: 'Order Priority',
              value: formik.values?.order_priority,
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
              onClick={() => router.push('/orders')}
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
    entity: 'order',
    operation: AccessOperationEnum.UPDATE,
  }),
)(OrderEditPage);
