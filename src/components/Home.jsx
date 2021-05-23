import { useState } from "react";
const Home = () => {
  const [data, setData] = useState();

  let response;
  async function getData() {
    response = await fetch("http://localhost:3030/");
    try {
      let data = await response.text();
      console.log("this is " + data);
      setData(data);
    } catch (err) {
      throw err;
    }
  }

  getData();

  return <h1>This is {data}!</h1>;
};

export default Home;
