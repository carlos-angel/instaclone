import React from "react";
import { Button } from "semantic-ui-react";
import "./HeaderProfile.scss";

export default function HeaderProfile({ username, auth, handleModal }) {
  return (
    <div className="header-profile">
      <h2>{username}</h2>
      {username === auth.username ? (
        <Button
          onClick={() => {
            handleModal("settings");
          }}
        >
          Ajustes
        </Button>
      ) : (
        <Button>Seguir</Button>
      )}
    </div>
  );
}
