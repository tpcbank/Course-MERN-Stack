import { Switch, Route } from "react-router-dom";
import App from "./App";
import EditComponent from "./components/EditComponent";
import FormComponent from "./components/FormComponent";
import Logincomponent from "./components/Logincomponent";
import SingleComponent from "./components/SingleComponent";
import AdminRoute from "./AdminRoute";

const MyRoute = () => {
  return (
    <Switch>
      <Route exact path="/" component={App} />
      <AdminRoute exact path="/create" component={FormComponent} />
      <Route exact path="/blog/:slug" component={SingleComponent} />
      <AdminRoute exact path="/blog/edit/:slug" component={EditComponent} />
      <Route exact path="/login" component={Logincomponent} />
    </Switch>
  );
};

export default MyRoute;
