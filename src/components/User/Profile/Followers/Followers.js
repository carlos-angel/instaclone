import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_FOLLOWERS } from "../../../../gql/follow";
import { size } from "lodash";
import ModalBasic from "../../../Modal/ModalBasic";
import ListUsers from "../../ListUsers";
import "./Followers.scss";

export default function Follow({ username }) {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [childrenModal, setChildrenModal] = useState(null);

  const {
    data: dataFollowers,
    loading: loadingFollowers,
    startPolling: startPollingFollowers,
    stopPolling: stopPollingFollowers,
  } = useQuery(GET_FOLLOWERS, {
    variables: {
      username,
    },
  });

  useEffect(() => {
    startPollingFollowers(1000);
    return () => stopPollingFollowers();
  }, [startPollingFollowers, stopPollingFollowers]);

  if (loadingFollowers) {
    return null;
  }
  const { getFollowers } = dataFollowers;

  const openFollowers = () => {
    setShowModal(true);
    setTitleModal("Seguidores");
    setChildrenModal(
      <ListUsers users={getFollowers} setShowModal={setShowModal} />
    );
  };

  return (
    <>
      <div className="followers">
        <p>
          {" "}
          <span>**</span> publicaciones
        </p>
        <p className="link" onClick={openFollowers}>
          {" "}
          <span>{size(getFollowers)}</span> seguidores
        </p>
        <p className="link">
          {" "}
          <span>**</span> seguidos
        </p>
      </div>
      <ModalBasic
        show={showModal}
        setShow={setShowModal}
        title={titleModal}
        children={childrenModal}
      ></ModalBasic>
    </>
  );
}
