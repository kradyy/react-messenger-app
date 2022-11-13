import React from "react";
import Message from "./components/Message";
import FlipMove from "react-flip-move";
import Username, {
  ChangeNameModal as ModalSetName,
} from "./components/Username";
import { db } from "./firebase";
import firebase from "firebase/compat/app";
import { serverTimestamp } from "firebase/firestore";
import Logo from "./logo.svg";

function App() {
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const [username, setUserName] = React.useState("");
  const [userModalOpenState, setUserModalOpenState] = React.useState();
  const bottomRef = React.useRef();

  const setInputValue = (e) => {
    setInput(e.target.value);
  };

  const sendMessage = (e) => {
    e.preventDefault();

    // All the logic to send message goes here
    if (!input.length) return;

    db.collection("messages").add({
      username: username,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  // Set username
  React.useEffect(() => {
    // Show user modal on empty username
    setUserModalOpenState(!username ? true : false);
  }, []);

  React.useEffect(() => {
    // Listen for db changes (snapshot) and update directly
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        const messages = snapshot.docs.map((doc) => {
          return { id: doc.id, data: doc.data() };
        });

        setMessages(messages.reverse());
      });
  }, []);

  React.useEffect(
    (e) => {
      bottomRef.current?.scrollIntoView({ behaviour: "smooth" });
    },
    [messages]
  );

  return (
    <div className="App">
      <ModalSetName
        username={username}
        setUsername={setUserName}
        modalOpen={userModalOpenState}
        setModalOpen={setUserModalOpenState}
      />

      {username && (
        <>
          <div className="container max-w-[500px] bg-white rounded-md shadow-2xl mx-auto mt-20">
            <header className="flex flex-col py-10 items-center">
              {<img src={Logo} className="w-16 h-16" alt="Messenger Logo" />}
            </header>
            <div className="flex justify-center items-center flex-col px-10">
              <div className="message-container w-full max-h-[500px] overflow-scroll py-5">
                <FlipMove typeName="ul" className="flex flex-col">
                  {messages &&
                    messages.map(({ id, data }) => {
                      return (
                        <Message
                          username={data.username}
                          ownUsername={username}
                          key={id}
                        >
                          {data.message}
                        </Message>
                      );
                    })}
                </FlipMove>

                <div ref={bottomRef}></div>
              </div>

              <form className="flex w-full my-5 gap-4 items-center">
                <input
                  value={input}
                  onChange={setInputValue}
                  className="border-black text-xl flex-1 font-light py-2 border-b-2 duration-300 focus:border-primary focus:outline-0"
                  placeholder="Write a message .."
                />
                <button
                  type="submit"
                  onClick={sendMessage}
                  disabled={!input}
                  className="bg-primary py-1 px-3 hover:shadow-lg hover:opacity-80 self-stretch outline duration-500 hover:bg-blue-600 text-white disabled:opacity-20"
                >
                  Send message
                </button>
              </form>
            </div>
          </div>
          <div className="container mx-auto max-w-[500px] my-5 text-center text-white">
            <button
              className="text-sm hover:opacity-90 cursor-pointer"
              onClick={() => setUserModalOpenState(true)}
            >
              (Change username)
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
