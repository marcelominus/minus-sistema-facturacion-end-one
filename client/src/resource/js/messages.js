//MESAGGES
import { message } from "antd";

//*******************************************************
//
export const messageError = (value, time) => {
  message.error({
    content: value,
    duration: time,
    className: "message-error",
  });
};

//*******************************************************
//
export const messageWarning = (value, time) => {
  message.warning({
    content: value,
    duration: time,
    className: "message-warning",
  });
};

//*******************************************************
//
export const messageSuccess = (value, time) => {
  message.success({
    content: value,
    duration: time,
    className: "message-success",
  });
};
