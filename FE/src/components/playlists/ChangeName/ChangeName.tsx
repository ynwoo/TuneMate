import { Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import styles from "./ChangeName.module.css";
import Props from "@/types";
import Button from "@/components/button/Button";

interface ChangeNameProps extends Props {
  changeName: (name: string) => Promise<void>;
  closeModal: () => void;
}

const ChangeName = ({ changeName, closeModal}: ChangeNameProps) => {
  const [nameInput, setNameInput] = useState<string>("");

  const changePlaylistName = () => {
    changeName(nameInput);
    closeModal()
  }

  return (
    <div className={styles["container"]}>
      <Form.Control
        type="search"
        placeholder="insert name..."
        value={nameInput}
        onChange={(e) => setNameInput(e.target.value)}
        className="my-custom-class rounded-pill"
        style={{
          border: "2px solid #d4bafd",
          borderRadius: "20px",
          padding: "10px",
          width: "100%",
        }}
      />
      <Button color="white" onClick={changePlaylistName}>
        <div>확인</div>
      </Button>
    </div>
  );
};

export default ChangeName;