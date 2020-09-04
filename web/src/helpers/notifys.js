import React from "react";

import { toast } from "react-toastify";

import {
  RiErrorWarningLine,
  RiCheckLine,
  RiAlertLine,
  RiInformationLine,
} from "react-icons/ri";

export default function notify(type, message) {
  const Foo = ({ textMessage, icon }) => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <h1>{icon}</h1>
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
      toast.success(
        <Foo textMessage={message} icon={<RiCheckLine size={50} />} />
      );
      break;

    case "warning":
      toast.warn(
        <Foo textMessage={message} icon={<RiErrorWarningLine size={50} />} />
      );

      break;

    case "error":
      toast.error(
        <Foo textMessage={message} icon={<RiAlertLine size={50} />} />
      );
      break;

    default:
      toast.info(
        <Foo textMessage={message} icon={<RiInformationLine size={50} />} />
      );
  }
}
