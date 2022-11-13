import React, { Component } from "react";
import { useEffect } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

// useState = variable in react
// useEffect = run code on a condition
export const ChangeNameModal = (props) => {
  const { username, setUsername, modalOpen, setModalOpen } = props;

  const [newUsername, setNewUsername] = React.useState();

  const inputRef = React.useRef();

  const setNameSubmit = (e) => {
    e.preventDefault();

    if (!newUsername) {
      console.log("inputRef.current.classList", inputRef.current.classList);
      inputRef.current.classList.add("border-error");
    }

    setUsername(newUsername);
    setModalOpen(false);
  };

  const newUserNameChange = (e) => {
    setNewUsername(e.target.value);
    inputRef.current.classList.remove("border-error");
  };

  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, []);

  return (
    <>
      <Popup
        className="shadow-2xl modal"
        position="right center"
        open={modalOpen}
        modal
        closeOnDocumentClick={false}
      >
        <div className="py-5 px-4">
          <h3 className="text-xl mb-5">
            Please set an username before continuing.
          </h3>

          <form className="flex gap-10 justify-between">
            <input
              type="text"
              ref={inputRef}
              className="border-black text-xl flex-1 font-light py-2 border-b-2 duration-300 focus:border-primary focus:outline-0"
              placeholder="Username"
              onChange={newUserNameChange}
              value={newUsername}
              defaultValue={username}
            />
            <button
              type="submit"
              className="bg-secondary text-white p-3 hover:opacity-90 duration-500"
              onClick={setNameSubmit}
            >
              Update name
            </button>
          </form>
        </div>
      </Popup>
    </>
  );
};

class Username extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    return <p>stuff</p>;
  }

  showX() {
    return <p>hello 2</p>;
  }
}

export default Username;
