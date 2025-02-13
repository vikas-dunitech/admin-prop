import type { AppProps } from "next/app";
import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
          <Component {...pageProps} />
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            draggable={false}
            closeOnClick
            pauseOnHover
            theme="dark"
          />
    </>
  );
}
