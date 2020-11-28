import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listUsers, deleteUser } from "../actions/userActions";
import { USER_DELETE_RESET_ERROR } from "../constants/userConstants";

const UserListScreen = ({ color, history }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const userLogin = useSelector((state) => state.userLogin);
  const userDelete = useSelector((state) => state.userDelete);
  const { loading, error, users } = userList;
  const { success: successDelete, error: errorDelete } = userDelete;

  useEffect(() => {
    dispatch(listUsers());
    return function () {
      dispatch({ type: USER_DELETE_RESET_ERROR });
    };
  }, [dispatch, history, successDelete]);

  const deleteHandler = (id) => {
    const userNameToDelete = userList.users.filter((user) => id === user._id)[0]
      .name;

    if (
      window.confirm(
        `Are you sure that you want delete the user ${userNameToDelete}?`
      )
    ) {
      dispatch(deleteUser(id));
    }
  };
  return (
    <>
      <h1>Users</h1>
      {!userLogin.userInfo?.isAdmin && <Redirect to='/login' />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table
          striped
          bordered
          hover
          responsive
          className='table-sm text-center'
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              {/* <th></th> */}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a style={{ color }} href={`mailto:${user.email}`}>
                    {user.email}
                  </a>{" "}
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className='fas fa-check' style={{ color: "green" }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant='warning' className='btn-sm px-2 mr-1'>
                      <i className='fas fa-edit'> </i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='red'
                    className='btn-sm px-2 btn-danger'
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

UserListScreen.defaultProps = {
  color: "rgb(14, 72, 120)",
};

export default UserListScreen;
