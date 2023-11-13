import React, { useEffect } from "react";
import styles from "./Button.module.css";
import { classNameWrapper } from "@/utils/className";

const PWAButton = () => {
  let installPrompt: any = null;

  useEffect(() => {
    const installButton = document.querySelector("#install");

    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      installPrompt = event;
      installButton?.removeAttribute("hidden");

      installButton?.addEventListener("click", async () => {
        if (!installPrompt) {
          return;
        }
        const result = await installPrompt.prompt();
        console.log(`Install prompt was: ${result.outcome}`);
        installPrompt = null;
        installButton.setAttribute("hidden", "");
      });
    });
  }, []);

  return (
    <button
      className={classNameWrapper(styles["button"], styles["red"])}
      id="install"
      hidden
    >
      앱 설치하기
    </button>
  );
};

export default PWAButton;
