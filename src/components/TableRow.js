import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { firestore } from "../firebase/firebase.utils";

const TableRow = ({ task, index }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [user, setUser] = useState();

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      const user = firestore.collection("users").doc(`${task.user}`).get();
      user.then((user) => setUser(user.data()));
    }

    return () => {
      mounted = false;
    };
  }, [task.user]);

  return (
    <tr>
      <th scope="row">{index}</th>
      <td>
        <Link to={`tasks/${task.id}`}>{task.title}</Link>
      </td>
      <td>{user?.displayName || "loading..."}</td>
      <td>{task.status}</td>
      <td>
        {currentUser.id === task.user && (
          <Link
            to={`edit-task/${task.id}`}
            className="btn btn-sm btn-secondary"
          >
            <i className="fas fa-edit fa-2x"></i>
          </Link>
        )}
        <Link
          to={`tasks/history/${task.id}`}
          className="btn btn-sm btn-secondary"
        >
          <i className="fas fa-history fa-2x"></i>
        </Link>
      </td>
    </tr>
  );
};

export default TableRow;
