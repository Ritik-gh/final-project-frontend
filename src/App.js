import { useState, createContext } from "react";
import Header from "./components/helper/Header";
import Router from "./router.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/app.css";
// import Router from "./router.js";

export const Auth = createContext();

const App = () => {
  const [isAuth, setAuth] = useState(
    window.localStorage.user === undefined || window.localStorage.user === ""
      ? false
      : true
  );
  let Authorization = {
    isAuth: isAuth,
    setAuth,
  };

  return (
    <>
      <Auth.Provider value={Authorization}>
        <Header />
        <main>
          <Router />
        </main>
      </Auth.Provider>
    </>
  );
};

export default App;
