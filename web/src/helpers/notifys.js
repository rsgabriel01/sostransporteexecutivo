import React from "react";

import { toast } from "react-toastify";

import { RiErrorWarningLine } from "react-icons/ri";

export default function notify(type, message) {
  const Foo = ({ textMessage }) => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <h1>
          <RiErrorWarningLine size={50} />
        </h1>
        <span
          style={{
            paddingLeft: "10px",
            paddingRight: "10px",
            fontSize: "16px",
          }}
        >
          {textMessage}
        </span>
      </div>
    );
  };

  switch (type) {
    case "success":
      toast.success(<Foo textMessage={message} />);
      break;

    case "warning":
      toast.warn(<Foo textMessage={message} />);

      break;

    case "error":
      toast.error(<Foo textMessage={message} />);
      break;

    default:
      toast.info(<Foo textMessage={message} />);
  }
}
