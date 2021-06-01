import { Switch, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import Post from "./components/Post.jsx";

const Router = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/post" component={Post} />
    </Switch>
  );
};

export default Router;
