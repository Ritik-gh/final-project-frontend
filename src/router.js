import { Switch, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import PostAd from "./components/PostAd.jsx";
import Post from "./components/Post.jsx";
import Profile from "./components/Profile.jsx";

const Router = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/post-ad" component={PostAd} />
      <Route exact path="/post/:id" component={Post} />
      <Route exact path="/profile" component={Profile} />
    </Switch>
  );
};

export default Router;
