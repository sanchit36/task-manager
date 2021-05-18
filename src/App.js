import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import ProfilePage from "./pages/ProfilePage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { getUserData } from "./redux/user/user.actions";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        createUserProfileDocument(user).then((userRef) => {
          userRef
            .get()
            .then((user) =>
              dispatch(getUserData({ id: user.id, ...user.data() }))
            );
        });
      } else {
        dispatch(getUserData(null));
      }
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <Fragment>
      <Header />
      <main>
        <div className="container my-5">
          {user ? (
            <ProfilePage />
          ) : (
            <Switch>
              <Route path="/signup" component={SignUp} />
              <Route path="/" component={SignIn} />
            </Switch>
          )}
        </div>
      </main>
    </Fragment>
  );
}

export default App;
