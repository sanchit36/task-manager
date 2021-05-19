import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import CommentForm from "../components/CommentForm";
import { firestore } from "../firebase/firebase.utils";
import Moment from "react-moment";

const TaskDetail = () => {
  const { taskID } = useParams();
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setLoading(true);
    let mounted = true;

    if (mounted) {
      const taskRef = firestore.collection("tasks").doc(taskID);

      taskRef
        .get()
        .then((task) => {
          setTask({ id: task.id, ...task.data() });
          taskRef
            .collection("comments")
            .orderBy("timestamp", "desc")
            .onSnapshot((comments) => {
              setLoading(false);
              setComments(
                comments.docs.map((comment) => ({
                  id: comment.id,
                  ...comment.data(),
                }))
              );
            });
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    }

    return () => {
      mounted = false;
    };
  }, [taskID]);
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="container">
          <h1>{task.title}</h1>
          <p>Status: {task.status}</p>
          <hr />
          <p>{task.description}</p>
          {task.fileType === "image" && (
            <img className="img-fluid" src={task.fileURL} alt={task.title} />
          )}

          {task.fileType === "video" && (
            <video width="320" height="240" controls>
              <source src={task.fileURL} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          <hr />
          <h3>COMMENTS</h3>
          <CommentForm taskID={taskID} />

          <div className="my-3">
            {comments?.length ? (
              comments.map((comment) => (
                <div className="media my-5" key={comment.id}>
                  <div className="media-body">
                    <h6>{comment.author}</h6>
                    <p className="mb-0">{comment.content}</p>
                    <Moment className="text-muted" fromNow ago>
                      {comment.timestamp?.toDate()}
                    </Moment>
                  </div>
                </div>
              ))
            ) : (
              <p>No Comments</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetail;
