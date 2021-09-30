import ListPage from "./Pages/ListPage/listPage";
import AddLinkPage from "./Pages/AddLinkPage/addLinkPage";
import { Provider } from "react-redux";
import store from "../src/Redux/store";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const App = () => {
  return (
    <Provider store={store}>
    <Router>
      <Switch>
            <Route exact path="/">
              <ListPage/>
            </Route>
            <Route path="/addlinkpage">
              <AddLinkPage/>
            </Route>
      </Switch>
    </Router>
    </Provider>
  );
};

export default App;