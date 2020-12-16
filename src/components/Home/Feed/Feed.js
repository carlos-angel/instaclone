import React, { useState, useEffect } from "react";
import { Image } from "semantic-ui-react";
import { map } from "lodash";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PUBLICATIONS_FOLLOWEDS } from "../../../gql/publication";
import CommentForm from "../../Modal/ModalPublication/CommentForm";
import Actions from "../../Modal/ModalPublication/Actions";
import ModalPublication from "../../Modal/ModalPublication";
import ImageNotFound from "../../../assets/png/avatar.png";
import "./Feed.scss";

export default function Feed() {
  const [showModal, setShowModal] = useState(false);
  const [publicationSelect, setPublicationSelect] = useState(false);
  const { data, loading, startPolling, stopPolling } = useQuery(
    GET_PUBLICATIONS_FOLLOWEDS
  );

  useEffect(() => {
    startPolling(2000);
    return () => stopPolling();
  }, [startPolling, stopPolling]);

  if (loading) {
    return null;
  }

  const openPublication = publication => {
    setPublicationSelect(publication);
    setShowModal(true);
  };
  const { getPublicationsFolloweds } = data;

  return (
    <>
      <div className="feed">
        {map(getPublicationsFolloweds, (publication, index) => {
          return (
            <div key={index} className="feed__box">
              <Link to={`/${publication.idUser.username}`}>
                <div className="feed__box-user">
                  <Image
                    src={publication.idUser.avatar || ImageNotFound}
                    avatar
                  />
                  <span>{publication.idUser.name}</span>
                </div>
              </Link>
              <div
                className="feed__box-photo"
                style={{ backgroundImage: `url("${publication.file}")` }}
                onClick={() => openPublication(publication)}
              />
              <div className="feed__box-actions">
                <Actions publication={publication} />
              </div>
              <div className="feed__box-form">
                <CommentForm publication={publication} />
              </div>
            </div>
          );
        })}
      </div>
      <div>
        {showModal && (
          <ModalPublication
            show={showModal}
            setShow={setShowModal}
            publication={publicationSelect}
          />
        )}
      </div>
    </>
  );
}
