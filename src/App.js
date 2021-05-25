import Header from "./components/helper/Header";
import Router from "./router.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/app.css";
// import Router from "./router.js";

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Router />
      </main>
    </>
  );
};

export default App;
