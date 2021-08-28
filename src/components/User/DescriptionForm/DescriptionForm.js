import React from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../../gql/user';
import { Form, TextArea, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import './DescriptionForm.scss';

export default function DescriptionForm({
  setShowModal,
  description,
  refetch,
}) {
  const [updateUser] = useMutation(UPDATE_USER);

  const formik = useFormik({
    initialValues: { description: description || '' },
    validationSchema: Yup.object({
      description: Yup.string().required(),
    }),
    onSubmit: async (dataForm) => {
      try {
        const { data } = await updateUser({
          variables: {
            input: dataForm,
          },
        });
        if (!data.updateUser) {
          toast.error('Error al actualizar descripción');
        } else {
          toast.success('Descripción actualizada');
          refetch();
          setShowModal(false);
        }
      } catch (error) {
        toast.error('Error al actualizar descripción');
      }
    },
  });

  return (
    <Form className='description-form' onSubmit={formik.handleSubmit}>
      <TextArea
        name='description'
        value={formik.values.description}
        onChange={formik.handleChange}
        className={formik.errors.description && 'error'}
      />
      <Button type='submit' className='btn-submit'>
        Actualizar
      </Button>
    </Form>
  );
}
