import React, { useState } from "react";
import { useSelector } from "react-redux";
import firebase, { firestore } from "../firebase/firebase.utils";

const CommentForm = ({ taskID }) => {
  const user = useSelector((state) => state.user.currentUser);
  const [content, setContent] = useState("");

  const submitFrom = (e) => {
    e.preventDefault();
    if (taskID) {
      firestore.collection("tasks").doc(taskID).collection("comments").add({
        author: user.displayName,
        content,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });

      setContent("");
    }
  };

  return (
    <form onSubmit={submitFrom} className="my-3">
      <div className="form-group">
        <label>Add comment</label>
        <textarea
          className="form-control"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="3"
        />
      </div>

      <button className="btn btn-primary" type="submit">
        Comment
      </button>
    </form>
  );
};

export default CommentForm;
