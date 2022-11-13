import React from "react";

const Message = React.forwardRef((props, ref) => {
  const children =
    typeof props.children !== "undefined" ? props.children : false;

  const { username, ownUsername } = props;

  const isOwnMessage = username === ownUsername ? true : false;

  if (!username || !children) {
    return false;
  }

  return (
    <li className="flex flex-col w-full mb-5" ref={ref}>
      <div
        className={`${
          isOwnMessage ? "bg-light" : "bg-primary text-white self-end"
        }
        shadow-sm w-fit py-3 px-4 rounded-md relative`}
      >
        <span className="message">
          {children
            ? typeof children === "string"
              ? children
              : children.map((child) => child)
            : "No message specified."}
        </span>
        <span
          className={`${
            isOwnMessage ? "bg-light left-3" : "bg-primary right-3"
          } 
          w-3 h-3 absolute bottom-0 rotate-45 -mb-1`}
        ></span>
      </div>
      <span
        className={`${isOwnMessage ? "self-start ml-3" : "self-end mr-3"} 
          py-3 text-sm italic`}
      >
        {isOwnMessage ? "Me" : username}
      </span>
    </li>
  );
});

export default Message;
