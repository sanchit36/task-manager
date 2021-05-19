import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { firestore, storage } from "../firebase/firebase.utils";

const AddTask = () => {
  const [values, setValues] = useState({
    title: "",
    description: "",
    user: "",
    fileURL: "",
    fileType: "",
  });
  const [file, setFile] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const usersSnapshot = firestore.collection("users").get();
    usersSnapshot.then((users) =>
      setOptions(users.docs.map((user) => ({ id: user.id, ...user.data() })))
    );
  }, []);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(values);

    if (file === "") {
      console.error(`not an image, the image file is a ${typeof imageAsFile}`);
      return;
    }
    if (!values.title) return;
    if (!values.description) return;
    if (!values.user) return;

    console.log("start of upload");

    const uploadTask = storage.ref(`/files/${file.name}`).put(file);
    //initiates the firebase side uploading
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot);
      },
      (err) => {
        //catches the errors
        console.log(err);
      },
      () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        storage
          .ref("files")
          .child(file.name)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            firestore
              .collection("tasks")
              .add({ ...values, fileURL: fireBaseUrl })
              .then((task) => console.log(task.id))
              .catch((err) => console.log(err));

            setValues({
              title: "",
              description: "",
              user: "",
              fileURL: "",
              fileType: "",
            });
            setFile("");
          });
      }
    );
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setValues((prevObject) => ({ ...prevObject, [name]: value }));
  };

  const handleFile = (e) => {
    const file = e.target.files[0];

    setValues((prevObject) => ({
      ...prevObject,
      fileType: file.type.split("/")[0],
    }));
    setFile(file);
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-lg-6 col-md-8 mx-auto">
          <div className="card">
            <div className="card-body">
              <div className="card-title">
                <h1 className="text-center">Add Task</h1>
              </div>
              <form onSubmit={onSubmitHandler}>
                <div className="form-group">
                  <label htmlFor="title">Task Title</label>
                  <input
                    type="title"
                    className="form-control"
                    id="title"
                    placeholder="Enter title"
                    required
                    name="title"
                    value={values.title}
                    onChange={onChangeHandler}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Task Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    id="description"
                    placeholder="Enter Description"
                    cols="30"
                    rows="10"
                    value={values.description}
                    onChange={onChangeHandler}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="user">Select user</label>
                  <select
                    className="form-control"
                    id="user"
                    name="user"
                    value={values.user}
                    onChange={onChangeHandler}
                  >
                    {options?.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.displayName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="file">Upload File</label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="file"
                    onChange={handleFile}
                    onSelect={handleFile}
                  />
                </div>
                <button
                  type="submit"
                  className="mt-4 btn btn-primary btn-block"
                >
                  SUBMIT
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddTask;
