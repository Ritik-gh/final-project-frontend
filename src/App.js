import { useState, createContext } from "react";
import Header from "./components/sub/Header";
import Footer from "./components/sub/Footer";
import Router from "./router.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/app.css";
// import Router from "./router.js";

import { Provider } from "react-redux";
import store from "@/store/store";

export const Auth = createContext();

const App = () => {
  const [isAuth, setAuth] = useState(
    window.localStorage.token === undefined || window.localStorage.token === ""
      ? false
      : true
  );
  let Authorization = {
    isAuth: isAuth,
    setAuth,
  };

  return (
    <>
      <Provider store={store}>
        <Auth.Provider value={Authorization}>
          <Header />
          <main>
            <Router />
          </main>
          <Footer />
        </Auth.Provider>
      </Provider>
    </>
  );
};

export default App;
