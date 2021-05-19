import React, { useEffect, useState } from "react";
import { firestore } from "../../firebase/firebase.utils";

const TableRow = ({ task, index }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const user = firestore.collection("users").doc(`${task.user}`).get();
    user.then((user) => setUser(user.data()));
  }, [task.user]);

  return (
    <tr>
      <th scope="row">{index}</th>
      <td>{task.title}</td>
      <td>{user?.displayName || "loading..."}</td>
      <td>{task.status}</td>
      <td>
        <button className="btn btn-sm btn-secondary">
          <i className="fas fa-edit fa-2x"></i>
        </button>
        <button className="btn btn-sm btn-secondary">
          <i className="fas fa-history fa-2x"></i>
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
