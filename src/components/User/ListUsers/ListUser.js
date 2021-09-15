import React from 'react';
import { Image } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { size, map } from 'lodash';
import avatarNotFound from 'assets/png/avatar.png';
import './ListUser.scss';

export default function ListUser({ users, setShowModal }) {
  const history = useHistory();

  const goToUser = (username) => {
    setShowModal(false);
    history.push(`/${username}`);
  };

  return (
    <div className='list-users'>
      {size(users) === 0 ? (
        <p className='list-users__not-users'>No se han encontrado usuarios</p>
      ) : (
        map(users, (user, index) => (
          <div
            key={index}
            className='list-users__user'
            onClick={() => goToUser(user.username)}
          >
            <Image src={user.avatar || avatarNotFound} avatar />
            <div>
              <p>{user.name}</p>
              <p>{user.username}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
