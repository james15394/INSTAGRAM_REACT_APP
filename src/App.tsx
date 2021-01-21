import Header from "./components/Header/Header";
import NewFeed from "./features/NewFeed/NewFeed";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import SignUp from "./components/SignUp/SignUp";
import { auth } from "./firebase";
import { useEffect } from "react";
import { addUser } from "./components/SignUp/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Login from "./components/Login/Login";
import { RootState } from "./store";

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user);
  const PrivateRoute: React.FC<{
    children: any;
    path: string;
    exact: boolean;
  }> = ({ children, path, exact }) => {
    return currentUser.entities.user ? (
      <Route path={path} exact={exact}>
        {children}
      </Route>
    ) : (
      <Redirect to="/login" />
    );
  };
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user && dispatch(addUser({ user }));
    });
  }, []);
  return (
    <div className="app__wrapper">
      <Router>
        <Switch>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/login">
            <Login />
          </Route>

          <PrivateRoute exact path="/">
            <Header />
            <NewFeed />
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
