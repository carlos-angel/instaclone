import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { REGISTER } from "../../../gql/user";
import "./RegisterForm.scss";

export default function RegisterForm({ setShowLogin }) {
  const [register] = useMutation(REGISTER);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object({
      name: Yup.string().required("Tu nombre es obligatorio"),
      email: Yup.string()
        .email("El email no es valido")
        .required("El email es obligatorio"),
      username: Yup.string()
        .matches(
          /^[a-zA-Z0-9-]*$/,
          "El nombre del usuario no debe tener espacios"
        )
        .required("El nombre del usuario es obligatorio"),
      password: Yup.string().required("La contraseña es obligatoria"),
      repeatPassword: Yup.string()
        .required("La contraseña es obligatoria")
        .oneOf([Yup.ref("password")], "Las contraseñas no coinciden entre si")
    }),
    onSubmit: async formData => {
      try {
        const newUser = formData;
        delete newUser.repeatPassword;

        await register({
          variables: {
            input: newUser
          }
        });

        toast.success("USuario registrado correctamente");
        setShowLogin(true);
      } catch (error) {
        toast.error(error.message);
      }
    }
  });

  return (
    <>
      <h2 className="register-form-title">
        Regístrate para ver fotos y videos de tus amigos
      </h2>

      <Form className="register-form" onSubmit={formik.handleSubmit}>
        <Form.Input
          type="text"
          placeholder="Nombre y apellidos"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.errors.name && true}
        />
        <Form.Input
          type="text"
          placeholder="Correo electrónico"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors.email && true}
        />
        <Form.Input
          type="text"
          placeholder="Nombre de usuario"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.errors.username && true}
        />
        <Form.Input
          type="password"
          placeholder="Contraseña"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.errors.password && true}
        />
        <Form.Input
          type="password"
          placeholder="Confirmar contraseña"
          name="repeatPassword"
          value={formik.values.repeatPassword}
          onChange={formik.handleChange}
          error={formik.errors.repeatPassword && true}
        />

        <Button type="submit" className="btn-submit">
          Registrate
        </Button>
      </Form>
    </>
  );
}

function initialValues() {
  return {
    name: "",
    email: "",
    username: "",
    password: "",
    repeatPassword: ""
  };
}
