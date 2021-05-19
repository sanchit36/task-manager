import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import Moment from "react-moment";
import { useParams } from "react-router";
import { firestore } from "../firebase/firebase.utils";

const History = () => {
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const { taskID } = useParams();
  useEffect(() => {
    setLoading(true);
    let mounted = true;
    if (mounted) {
      const taskRef = firestore.collection("tasks").doc(taskID);
      taskRef
        .collection("history")
        .orderBy("timestamp", "desc")
        .onSnapshot((history) => {
          setLoading(false);
          setHistory(
            history.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        });
    }

    return () => {
      mounted = false;
    };
  }, [taskID]);
  return (
    <Fragment>
      <div className="container">
        {loading ? (
          "loading..."
        ) : (
          <>
            <h1>Task History</h1>
            {history?.length ? (
              <ul className="list-group my-5">
                {history?.map((doc) => (
                  <li
                    key={doc.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    {doc.message}{" "}
                    <span className="badge badge-primary badge-pill py-2">
                      <Moment className="text-muted" fromNow ago>
                        {doc.timestamp?.toDate()}
                      </Moment>
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No History</p>
            )}
          </>
        )}
      </div>
    </Fragment>
  );
};

export default History;
