import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 ** it shows the toast notification
 * ? if you don't specify  {autoClose : false} in the object , >> autoClose will be automatic after 5sec*
 * todo : Task done and finished
 * @param args  this method take a object { message:"Muhesi merci", typeToast: "dark", autoClose: false}
 * @throws Exception
 */
toast.configure();
export const showToast = (message) => {
  var options = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    Transition: "slide"
  };
  if (message.autoClose === false) options = { ...options, progress: 1 };
  // info  success  warning error default dark

  switch (message.typeToast) {
    case "warn":
      return toast.warn(message.message, options);
    case "info":
      return toast.info(message.message, options);
    case "success":
      return toast.success(message.message, options);
    case "error":
      return toast.error(message.message, options);
    case "dark":
      return toast.dark(message.message, options);
    default:
      return toast.dark(message.message, options);
  }
};
export const statusToast = {
  ERROR: "error",
  SUCCESS: "success",
  DARK: "dark",
  INFO: "info",
  WARN: "warn"
};
