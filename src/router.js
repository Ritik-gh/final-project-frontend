import { Switch, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import PostAd from "./components/PostAd.jsx";
import Post from "./components/Post.jsx";
import Profile from "./components/Profile.jsx";
import Chats from "./components/Chats.jsx";
import Settings from "./components/Settings.jsx";

const Router = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/post-ad" component={PostAd} />
      <Route exact path="/post/:id" component={Post} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/chats/:bidderId?" component={Chats} />
      <Route exact path="/settings" component={Settings} />
    </Switch>
  );
};

export default Router;
