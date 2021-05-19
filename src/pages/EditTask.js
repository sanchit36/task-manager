import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { useParams } from "react-router";
import firebase, { firestore } from "../firebase/firebase.utils";

const EditTask = () => {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const { taskID } = useParams();

  useEffect(() => {
    const usersSnapshot = firestore.collection("tasks").doc(taskID).get();
    usersSnapshot.then((task) => setStatus(task.data()?.status));
  }, [taskID]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    let mounted = true;
    if (mounted) {
      firestore
        .collection("tasks")
        .doc(taskID)
        .update({ status: status })
        .then(() => {
          setLoading(false);
          setMsg("Updated Successfully");
          firestore
            .collection("tasks")
            .doc(taskID)
            .collection("history")
            .add({
              message: `Task status is update to ${status}`,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
        })
        .catch((err) => {
          setLoading(false);
          console.error(err);
        });
    }

    return () => {
      mounted = false;
    };
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-lg-6 col-md-8 mx-auto">
          <div className="card">
            <div className="card-body">
              <div className="card-title">
                <h1 className="text-center">Update Status</h1>
              </div>
              {msg && <p className="text-center">{msg}</p>}
              <form onSubmit={onSubmitHandler}>
                <div className="form-group">
                  <label htmlFor="status">Update Status</label>
                  <select
                    className="form-control"
                    name="status"
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="TO DO">TO DO</option>
                    <option value="DOING">DOING</option>
                    <option value="DONE">DONE</option>
                  </select>
                </div>
                <button
                  disabled={loading}
                  type="submit"
                  className="mt-4 btn btn-primary btn-block"
                >
                  {loading ? "SUBMITING" : "SUBMIT"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditTask;
