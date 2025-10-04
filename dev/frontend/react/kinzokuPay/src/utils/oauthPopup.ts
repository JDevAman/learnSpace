  export function openOAuthPopup(url: string, callback: () => void) {
    const width = 500;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const popup = window.open(
      url,
      "_blank",
      `width=${width},height=${height},top=${top},left=${left}`
    );

    const listener = (event: MessageEvent) => {
      console.log(event);
      if (event.origin !== import.meta.env.VITE_BACKEND_URL) return;

      if (event.data.success) {
        callback();
        window.removeEventListener("message", listener);
      }
    };

    window.addEventListener("message", listener);
  }
