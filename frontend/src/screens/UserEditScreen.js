import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUser } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import {
  USER_UPDATE_RESET,
  USER_DETAILS_RESET,
} from "../constants/userConstants";

const UserEditScreen = ({ history, match }) => {
  const userId = match.params.id;
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [name, setName] = useState("");

  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      dispatch({ type: USER_DETAILS_RESET });
      history.push("/admin/userlist");
    } else {
      if (!user?.name || user?._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }

    return () => {
      setName("");
      setEmail("");
      setIsAdmin(false);
    };
  }, [user, dispatch, userId, successUpdate, history]);

  useEffect(() => {
    // message is empty (meaning no errors). Adjust as needed
    if (!error) {
      setVisible(false);
      return;
    }
    // error exists. Display the message and hide after 5 secs
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [error]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  return (
    <>
      {userLogin.userInfo?.isAdmin &&
      String(userLogin.userInfo?._id) === String(userId) ? (
        <Redirect to='/profile' />
      ) : (
        <>
          <Link to='/admin/userlist' className='btn btn-light my-3'>
            Go Back
          </Link>
          <FormContainer>
            <h1>Edit User</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading ? (
              <Loader />
            ) : error && visible ? (
              <Message variant='danger'>{error}</Message>
            ) : (
              <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type='name'
                    placeholder='Enter your name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Enter Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='isadmin'>
                  <Form.Check
                    type='checkbox'
                    label='Is admin?'
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                  ></Form.Check>
                </Form.Group>

                <Button type='submit' variant='primary'>
                  Update
                </Button>
              </Form>
            )}
          </FormContainer>
        </>
      )}
    </>
  );
};

export default UserEditScreen;
