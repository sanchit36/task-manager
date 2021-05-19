import React, { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import History from "./pages/History";
import ProfilePage from "./pages/ProfilePage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import TaskDetail from "./pages/TaskDetail";
import { getUserData } from "./redux/user/user.actions";
import PrivateRoute from "./route/PrivateRoute";
import ProtectedRoute from "./route/ProtectedRoute";

function App() {
  const dispatch = useDispatch();

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
        <div className="container-fluid px-5 my-5">
          <Switch>
            <PrivateRoute path="/" exact>
              <ProfilePage />
            </PrivateRoute>
            <PrivateRoute path="/tasks/:taskID" exact>
              <TaskDetail />
            </PrivateRoute>
            <PrivateRoute path="/tasks/history/:taskID" exact>
              <History />
            </PrivateRoute>
            <PrivateRoute path="/add-task" exact>
              <AddTask />
            </PrivateRoute>
            <PrivateRoute path="/edit-task/:taskID" exact>
              <EditTask />
            </PrivateRoute>
            <ProtectedRoute path="/login" exact>
              <SignIn />
            </ProtectedRoute>
            <ProtectedRoute path="/signup" exact>
              <SignUp />
            </ProtectedRoute>
          </Switch>
        </div>
      </main>
    </Fragment>
  );
}

export default App;
