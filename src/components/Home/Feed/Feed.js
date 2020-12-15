import React, { useState, useEffect } from "react";
import { Image } from "semantic-ui-react";
import { map } from "lodash";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PUBLICATIONS_FOLLOWEDS } from "../../../gql/publication";
import CommentForm from "../../Modal/ModalPublication/CommentForm";
import Actions from "../../Modal/ModalPublication/Actions";
import ImageNotFound from "../../../assets/png/avatar.png";
import "./Feed.scss";

export default function Feed() {
  const { data, loading } = useQuery(GET_PUBLICATIONS_FOLLOWEDS);

  if (loading) {
    return null;
  }

  const { getPublicationsFolloweds } = data;

  return (
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
  );
}
