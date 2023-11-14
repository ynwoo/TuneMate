import { useState, useCallback, useEffect } from "react";

export default function useToast() {
  const [toastStatus, setToastStatus] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const popToast = useCallback((msg: string) => {
    setToastStatus(true);
    setToastMsg(msg);
  }, []);

  const hideToast = () => {
    setToastStatus(false);
    setToastMsg('');
  }

  useEffect(() => {
    if (toastStatus) {
      setTimeout(() => hideToast(), 1000);
    }
  }, [toastStatus]);

  return {
    toastStatus,
    toastMsg,
    popToast,
  };
}
