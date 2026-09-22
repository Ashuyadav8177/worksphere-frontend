import { useState } from "react";

function useToast() {
  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  const showToast = (
    message,
    type = "success"
  ) => {
    setToast({
      message,
      type,
    });
  };

  const hideToast = () => {
    setToast({
      message: "",
      type: "success",
    });
  };

  return {
    toast,
    showToast,
    hideToast,
  };
}

export default useToast;