import React, { useState, useEffect } from "react";
import swal from "sweetalert";

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = () =>
    fetch("/api/users")
      .then(res => res.json())
      .then(data => setUsers(data.data))
      .catch(err => console.log(err));

  const onSubmit = e => {
    e.preventDefault();
    let data = {
      fullname: e.target.fullname.value,
      domicile: e.target.domicile.value
    };
    fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(() => {
        loadUser();
        swal("User Added");
      })
      .catch(err => console.log(err));
  };

  const onRemove = id => {
    fetch(`/api/users/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(() => {
        loadUser();
        swal("User Removed");
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <div className="card mt-5 p-3">
            <h3>Add User</h3>
            <hr />
            <form onSubmit={onSubmit}>
              <label htmlFor="name">Fullname</label>
              <input name="fullname" type="text" className="form-control" />
              <label htmlFor="Domicile">Domicile</label>
              <input name="domicile" type="text" className="form-control" />
              <button type="submit" className="btn btn-primary full-width">
                Save
              </button>
            </form>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card mt-5 p-3">
            <h3>List Users</h3>
            <hr />
            <table className="table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Fullname</th>
                  <th>Domicile</th>
                  <th colSpan="2"></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id}>
                    <td>{++index}</td>
                    <td>{user.fullname}</td>
                    <td>{user.domicile}</td>
                    <td>
                      <button
                        className="btn btn-warning"
                        data-toggle="modal"
                        data-target={`#updateModal${index}`}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <Modal index={index} user={user} loadUser={loadUser} />
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => onRemove(user.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .form-control {
          margin-bottom: 10px;
        }
        .full-width {
          width: 100%;
        }
      `}</style>
    </div>
  );
};

const Modal = ({ index, user, loadUser }) => {
  const onUpdate = e => {
    e.preventDefault();
    let data = {
      id: user.id,
      fullname: e.target.fullname.value,
      domicile: e.target.domicile.value
    };
    fetch(`/api/users/${user.id}`, {
      method: "PUT",
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(() => {
        loadUser();
        swal("User Updated");
      })
      .catch(err => console.log(err));
  };
  return (
    <div
      className="modal fade"
      id={`updateModal${index}`}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <form onSubmit={onUpdate}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update User
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <label htmlFor="fullname">Fullname</label>
              <input
                name="fullname"
                type="text"
                className="form-control"
                defaultValue={user.fullname}
              />
              <label htmlFor="fullname">Domicile</label>
              <input
                name="domicile"
                type="text"
                className="form-control"
                defaultValue={user.domicile}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
