import React, { useCallback, useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_AVATAR, GET_USER, DELETE_AVATAR } from '../../../gql/user';
import { Button } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { useDropzone } from 'react-dropzone';
import './AvatarForm.scss';

export default function AvatarForm({ setShowModal, auth }) {
  const [loading, setLoading] = useState(false);
  const [updateAvatar] = useMutation(UPDATE_AVATAR, {
    update(cache, { data: { updateAvatar } }) {
      // obtener cache
      const { getUser } = cache.readQuery({
        query: GET_USER,
        variables: {
          username: auth.username,
        },
      });
      // reescribir cache
      cache.writeQuery({
        query: GET_USER,
        variables: {
          username: auth.username,
        },
        data: {
          getUser: {
            ...getUser,
            avatar: updateAvatar.urlAvatar,
          },
        },
      });
    },
  });

  const [deleteAvatar] = useMutation(DELETE_AVATAR, {
    update(cache) {
      const { getUser } = cache.readQuery({
        query: GET_USER,
        variables: {
          username: auth.username,
        },
      });

      cache.writeQuery({
        query: GET_USER,
        variables: { username: auth.username },
        data: {
          getUser: {
            ...getUser,
            avatar: '',
          },
        },
      });
    },
  });

  const onDrop = useCallback(async (acceptedFile) => {
    const file = acceptedFile[0];
    try {
      setLoading(true);
      const { data } = await updateAvatar({ variables: { file } });
      if (!data.updateAvatar.status) {
        toast.warning('Error al actualizar el avatar');
      } else {
        setShowModal(false);
      }
      setLoading(false);
    } catch (error) {
      toast.warning('Error al actualizar el avatar');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/jpg, image/png',
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

  const onDeleteAvatar = async () => {
    try {
      const { data } = await deleteAvatar();
      if (!data.deleteAvatar) {
        toast.warning('error al borrar el avatar');
      } else {
        setShowModal(false);
      }
    } catch (error) {
      toast.warning('error al borrar el avatar');
    }
  };

  return (
    <div className='avatar-form'>
      <Button {...getRootProps()} loading={loading}>
        Subir Foto de perfil
      </Button>
      <Button onClick={onDeleteAvatar}>Eliminar Foto perfil</Button>
      <Button onClick={() => setShowModal(false)}>Cancelar</Button>
      <input {...getInputProps()} />
    </div>
  );
}
