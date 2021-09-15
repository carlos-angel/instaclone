import React, { useState } from 'react';
import { Image } from 'semantic-ui-react';
import ModalPublication from 'components/Modal/ModalPublication';
import './PreviewPublication.scss';

export default function PreviewPublication({ publication }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className='preview-publication' onClick={() => setShowModal(true)}>
        <Image className='preview-publication__image' src={publication.file} />
      </div>
      <ModalPublication
        show={showModal}
        setShow={setShowModal}
        publication={publication}
      />
    </>
  );
}
