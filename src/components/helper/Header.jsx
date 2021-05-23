import { useHistory } from "react-router-dom";
const Header = () => {
  const history = useHistory();
  return (
    <>
      <header className="container">
        <section className="d-flex justify-content-evenly align-items-center">
          <span className="" onClick={() => history.push("/")}>
            Home
          </span>
          <span className="" onClick={() => history.push("/login")}>
            Login
          </span>
          <span className="" onClick={() => history.push("/register")}>
            Register
          </span>
        </section>
      </header>
    </>
  );
};

export default Header;
