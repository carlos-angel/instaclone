import React from 'react';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from 'gql/comment';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './CommentForm.scss';

export default function CommentForm({ publication }) {
  const [addComment] = useMutation(ADD_COMMENT);

  const formik = useFormik({
    initialValues: {
      comment: '',
    },
    validationSchema: Yup.object({
      comment: Yup.string().required(),
    }),
    onSubmit: async (formData) => {
      try {
        await addComment({
          variables: {
            input: {
              idPublication: publication.id,
              comment: formData.comment,
            },
          },
        });
        formik.handleReset();
      } catch (error) {}
    },
  });

  return (
    <Form className='comment-form' onSubmit={formik.handleSubmit}>
      <Form.Input
        placeholder='Añadir comentario'
        name='comment'
        value={formik.values.comment}
        onChange={formik.handleChange}
        error={formik.errors.comment && true}
      />
      <Button type='submit'>Publicar</Button>
    </Form>
  );
}
