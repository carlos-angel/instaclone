import React from "react";
import { Button } from "semantic-ui-react";
import useAth from "../../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import PasswordForm from "../PasswordForm";
import "./SettingsForm.scss";

export default function SettingsForm({
  setShowModal,
  setTitleModal,
  setChildrenModal,
}) {
  const { logout } = useAth();
  const history = useHistory();
  const client = useApolloClient();
  const onLogout = () => {
    client.clearStore();
    logout();
    history.push("/");
  };

  const onChangePassword = () => {
    setTitleModal("cambiar contraseña");
    setChildrenModal(<PasswordForm onLogout={onLogout} />);
  };

  return (
    <div className="settings-form">
      <Button onClick={onChangePassword}>Cambiar contraseña</Button>
      <Button>Cambiar email</Button>
      <Button>Descripción</Button>
      <Button>Sitio Web</Button>
      <Button onClick={() => onLogout()}>Cerrar sección</Button>
      <Button onClick={() => setShowModal(false)}>Cancelar</Button>
    </div>
  );
}
