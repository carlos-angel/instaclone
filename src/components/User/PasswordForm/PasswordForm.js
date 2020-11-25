import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../gql/user";
import { Form, Button } from "semantic-ui-react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./PasswordForm.scss";

export default function PasswordForm({ onLogout }) {
  const [updateUser] = useMutation(UPDATE_USER);
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object({
      currentPassword: Yup.string().required(),
      newPassword: Yup.string().required(),
      repeatNewPassword: Yup.string()
        .required()
        .oneOf(
          [Yup.ref("newPassword")],
          "Las contraseñas no coinciden entre si"
        ),
    }),
    onSubmit: async (formValue) => {
      setError("");
      try {
        const result = await updateUser({
          variables: {
            input: {
              currentPassword: formValue.currentPassword,
              newPassword: formValue.newPassword,
            },
          },
        });

        if (result.data.updateUser) {
          toast.success("Contraseña actualizada. Inicie sessión nuevamente.");
          onLogout();
        } else {
          setError("La contraseña no es correcta");
        }
      } catch (error) {
        toast.error("Error al cambiar la contraseña");
      }
    },
  });

  return (
    <Form className="password-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        placeholder="Contraseña actual"
        type="password"
        name="currentPassword"
        value={formik.values.currentPassword}
        onChange={formik.handleChange}
        error={formik.errors.currentPassword && true}
      />
      {error && <p className="submit-error"> {error} </p>}
      <Form.Input
        placeholder="Nueva contraseña"
        type="password"
        name="newPassword"
        value={formik.values.newPassword}
        onChange={formik.handleChange}
        error={formik.errors.newPassword && true}
      />
      <Form.Input
        placeholder="Repetir nueva contraseña"
        type="password"
        name="repeatNewPassword"
        value={formik.values.repeatNewPassword}
        onChange={formik.handleChange}
        error={formik.errors.repeatNewPassword && true}
      />
      <Button type="submit" className="btn-submit">
        Actualizar
      </Button>
    </Form>
  );
}

function initialValues() {
  return {
    currentPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  };
}
