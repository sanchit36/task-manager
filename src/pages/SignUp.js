import React, { Fragment, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth, signInWithGoogle } from "../firebase/firebase.utils";

const SignIn = () => {
  const [values, setValues] = useState({
    displayName: "",
    email: "",
    password: "",
  });

  const history = useHistory();

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const { displayName, email, password } = values;

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((ref) => {
        ref.user.updateProfile({ displayName });
        history.push("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-lg-6 col-md-8 mx-auto">
          <div className="card">
            <div className="card-body">
              <div className="card-title">
                <h1 className="text-center">Sign Up</h1>
              </div>
              <form onSubmit={onSubmitHandler}>
                <div className="form-group">
                  <label htmlFor="displayName">display Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="displayName"
                    aria-describedby="displayName"
                    placeholder="Enter Display Name"
                    required
                    name="displayName"
                    value={values.displayName}
                    onChange={onChangeHandler}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    aria-describedby="eamil"
                    placeholder="Enter email"
                    required
                    name="email"
                    value={values.email}
                    onChange={onChangeHandler}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={values.password}
                    onChange={onChangeHandler}
                  />
                </div>
                <button
                  type="submit"
                  className="mt-4 btn btn-primary btn-block"
                >
                  SUBMIT
                </button>
              </form>

              <p className="my-4 text-center text-muted">OR</p>

              <button
                className="mt-4 btn btn-primary btn-block"
                onClick={() => signInWithGoogle()}
              >
                SIGN UP WITH GOOGLE
              </button>

              <br />

              <p className="text-center">
                already have a account? <Link to="/">login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SignIn;
