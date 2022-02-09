import { useState, createContext } from "react";
import Header from "@/components/sub/Header";
import Footer from "@/components/sub/Footer";
import Router from "@/router.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/assets/css/app.css";

import { Provider } from "react-redux";
import store from "@/store/store";

export const Auth = createContext();

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Header />
        <main>
          <Router />
        </main>
        <Footer />
      </Provider>
    </>
  );
};

export default App;
