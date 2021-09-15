import React from 'react';
import { Button } from 'semantic-ui-react';
import useAth from 'hooks/useAuth';
import { useHistory } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import PasswordForm from 'components/User/PasswordForm';
import EmailForm from 'components/User/EmailForm';
import DescriptionForm from 'components/User/DescriptionForm';
import WebsiteForm from 'components/User/WebsiteForm';
import './SettingsForm.scss';

export default function SettingsForm({
  setShowModal,
  setTitleModal,
  setChildrenModal,
  getUser,
  refetch,
}) {
  const { logout } = useAth();
  const history = useHistory();
  const client = useApolloClient();
  const onLogout = () => {
    client.clearStore();
    logout();
    history.push('/');
  };

  const onChangePassword = () => {
    setTitleModal('cambiar contraseña');
    setChildrenModal(<PasswordForm onLogout={onLogout} />);
  };

  const onChangeEmail = () => {
    setTitleModal('cambiar email');
    setChildrenModal(
      <EmailForm
        setShowModal={setShowModal}
        currentEmail={getUser.email}
        refetch={refetch}
      />,
    );
  };

  const onChangeDescription = () => {
    setTitleModal('Actualizar descripción');
    setChildrenModal(
      <DescriptionForm
        setShowModal={setShowModal}
        description={getUser.description}
        refetch={refetch}
      />,
    );
  };

  const onChangeWebsite = () => {
    setTitleModal('Actualizar Website');
    setChildrenModal(
      <WebsiteForm
        setShowModal={setShowModal}
        siteWeb={getUser.siteWeb}
        refetch={refetch}
      />,
    );
  };

  return (
    <div className='settings-form'>
      <Button onClick={onChangePassword}>Cambiar contraseña</Button>
      <Button onClick={onChangeEmail}>Cambiar email</Button>
      <Button onClick={onChangeDescription}>Descripción</Button>
      <Button onClick={onChangeWebsite}>Sitio Web</Button>
      <Button onClick={() => onLogout()}>Cerrar sección</Button>
      <Button onClick={() => setShowModal(false)}>Cancelar</Button>
    </div>
  );
}
