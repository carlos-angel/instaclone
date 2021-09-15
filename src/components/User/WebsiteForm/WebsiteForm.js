import React from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from 'gql/user';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Form, Button } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import './WebsiteForm.scss';

export default function WebsiteForm({ setShowModal, siteWeb, refetch }) {
  const [updateUser] = useMutation(UPDATE_USER);

  const formik = useFormik({
    initialValues: { siteWeb: siteWeb || '' },
    validationSchema: Yup.object({
      siteWeb: Yup.string().url().required(),
    }),
    onSubmit: async (dataForm) => {
      try {
        const { data } = await updateUser({
          variables: {
            input: dataForm,
          },
        });

        if (!data.updateUser) {
          toast.error('Error al actualizar');
        } else {
          toast.success('website actualizado');
          refetch();
          setShowModal(false);
        }
      } catch (error) {
        toast.error('Error al actualizar');
      }
    },
  });

  return (
    <Form className='website-form' onSubmit={formik.handleSubmit}>
      <Form.Input
        type='url'
        placeholder='website'
        name='siteWeb'
        value={formik.values.siteWeb}
        onChange={formik.handleChange}
        error={formik.errors.siteWeb && true}
      />
      <Button type='submit' className='btn-submit'>
        Actualizar
      </Button>
    </Form>
  );
}
