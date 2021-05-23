import { useState } from "react";
const Login = () => {
  return (
    <>
      <div className="container">
        <form>
          <input
            type="email"
            name=""
            id=""
            placeholder="Enter your email address"
          />
          <input
            type="password"
            name=""
            id=""
            placeholder="Enter your password"
          />
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
