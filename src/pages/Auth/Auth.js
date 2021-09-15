import React, { useState } from 'react';
import { Container, Image } from 'semantic-ui-react';
import { RegisterForm, LoginForm } from 'components/Auth';
import instaclone from 'assets/png/instaclone.png';
import './Auth.scss';

export default function Auth() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <Container fluid className='auth'>
      <Image src={instaclone} />
      <div className='container-form'>
        {showLogin ? (
          <LoginForm />
        ) : (
          <RegisterForm setShowLogin={setShowLogin} />
        )}
      </div>

      <div className='change-form'>
        <p>
          {showLogin ? (
            <>
              ¿No tienes una cuenta?
              <span onClick={() => setShowLogin(!showLogin)}>Regístrate</span>
            </>
          ) : (
            <>
              ¡Entra con tu cuenta!
              <span onClick={() => setShowLogin(!showLogin)}>
                Iniciar sesión
              </span>
            </>
          )}
        </p>
      </div>
    </Container>
  );
}
