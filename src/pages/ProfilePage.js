import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TableRow from "../components/TableRow";
import { firestore } from "../firebase/firebase.utils";
import { getAllTasks } from "../redux/tasks/tasks.actions";

const ProfilePage = () => {
  const user = useSelector((state) => state.user.currentUser);
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    const tasksSnapshot = firestore.collection("tasks").get();
    tasksSnapshot.then((tasks) =>
      dispatch(
        getAllTasks(tasks.docs.map((task) => ({ id: task.id, ...task.data() })))
      )
    );
  }, [dispatch]);

  return (
    <Fragment>
      <div className="my-3">
        <h4>Welcome! {user.displayName}</h4>
      </div>

      <div className="my-5 d-flex justify-content-between">
        <h3>Manage Tasks</h3>
        <Link to="/add-task" className="btn btn-dark">
          Add Task
        </Link>
      </div>
      <div className="table-responsive ">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Task</th>
              <th scope="col">Assigned To</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks?.length
              ? tasks?.map((task, index) => (
                  <TableRow key={task.id} task={task} index={index + 1} />
                ))
              : "NO TASK"}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default ProfilePage;
