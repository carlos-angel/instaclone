import React from 'react';
import { Button } from 'semantic-ui-react';
import { useQuery, useMutation } from '@apollo/client';
import { IS_FOLLOW, FOLLOW, UN_FOLLOW } from 'gql/follow';
import { toast } from 'react-toastify';
import './HeaderProfile.scss';

export default function HeaderProfile({ username, auth, handleModal }) {
  const [follow] = useMutation(FOLLOW);
  const [unFollow] = useMutation(UN_FOLLOW);

  const { data, loading, refetch } = useQuery(IS_FOLLOW, {
    variables: {
      username,
    },
  });

  const buttonFollow = () => {
    if (data.isFollow) {
      return (
        <Button className='btn-danger' onClick={onUnFollow}>
          Dejar de seguir
        </Button>
      );
    } else {
      return (
        <Button className='btn-action' onClick={onFollow}>
          Seguir
        </Button>
      );
    }
  };

  const onFollow = async () => {
    try {
      await follow({
        variables: {
          username,
        },
      });
      refetch();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onUnFollow = async () => {
    try {
      await unFollow({
        variables: {
          username,
        },
      });
      refetch();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className='header-profile'>
      <h2>{username}</h2>
      {username === auth.username ? (
        <Button
          onClick={() => {
            handleModal('settings');
          }}
        >
          Ajustes
        </Button>
      ) : (
        !loading && buttonFollow()
      )}
    </div>
  );
}
