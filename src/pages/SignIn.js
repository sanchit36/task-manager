import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { auth, signInWithGoogle } from "../firebase/firebase.utils";

const SignIn = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const signInWithEmailAndPasswordHandler = (event) => {
    event.preventDefault();
    const { email, password } = values;
    auth.signInWithEmailAndPassword(email, password);
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="card">
            <div className="card-body">
              <div className="card-title">
                <h1 className="text-center">Sign In</h1>
              </div>
              <form onSubmit={signInWithEmailAndPasswordHandler}>
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
                SIGN IN WITH GOOGLE
              </button>

              <br />

              <p className="text-center">
                don't have a account? <Link to="/signup">register</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SignIn;
