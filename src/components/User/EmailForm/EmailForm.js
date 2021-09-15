import React from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from 'gql/user';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import './EmailForm.scss';

export default function EmailForm({ setShowModal, currentEmail, refetch }) {
  const [updateUser] = useMutation(UPDATE_USER);

  const formik = useFormik({
    initialValues: { email: currentEmail || '' },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
    }),
    onSubmit: async (formData) => {
      try {
        const { data } = await updateUser({
          variables: {
            input: formData,
          },
        });
        if (!data.updateUser) {
          toast.error('Error al actualizar email');
        } else {
          toast.success('Email actualizado');
          refetch();
          setShowModal(false);
        }
      } catch (error) {
        toast.error('Error al actualizar email');
      }
    },
  });

  return (
    <Form className='email-form' onSubmit={formik.handleSubmit}>
      <Form.Input
        placeholder='Nuevo email'
        name='email'
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.errors.email && true}
      />
      <Button type='submit' className='btn-submit'>
        Actualizar
      </Button>
    </Form>
  );
}
