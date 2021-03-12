import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "recompose";
import { Form, Input, Button } from "antd";
import styled from "styled-components";
/* import { register } from "../action/user"; */

//firebase
import Firebase from "../util/firebase";

class SignUp extends Component {
  state = {};

  onFinish = (values) => {
    const { history } = this.props;
    const { email, lastName, firstName, password } = values;
    Firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      // handle success
      .then((data) => {
        // create a profile document on account create complete
        Firebase.firestore()
          .collection("users")
          .doc(data.user.uid)
          .set({
            first_name: firstName,
            last_name: lastName,
            email: email,
          })
          .then(history.push("/login"))
          .catch((err) => console.log(err, "err"));
      });
  };
  toLogin = () => {
    this.props.history.push("/login");
  };
  render() {
    return (
      <Container>
        <SignUpForm>
          <Title>Sign Up</Title>
          <Form
            style={{ margin: "0 auto" }}
            name="nest-messages"
            onFinish={this.onFinish}
          >
            <Form.Item
              name="firstName"
              rules={[{ required: true, message: "firstName is required" }]}
            >
              <StyledInput
                placeholder="FirstName"
              />
            </Form.Item>
            <Form.Item
              name="lastName"
              rules={[{ required: true, message: "lastName is required" }]}
            >
              <StyledInput
                placeholder="Last Name"
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "email is required" }]}
            >
              <StyledInput
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "password is required" }]}
            >
              <StyledInput
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                    background: "#FFFFFF 0% 0% no-repeat padding-box",
                    width: 250,
                    height: 45,
                    borderRadius: 47,
                    textAlign: "center",
                    font: "bold 28px/33px SF PRO, serif",
                    color: "#1890ff",
                  }}
              >
                Join Now
              </Button>
            </Form.Item>
          </Form>
          <Bottom onClick={this.toLogin}>Already have an account? Login</Bottom>
        </SignUpForm>
      </Container>
    );
  }
}
const Container = styled.div`
height: 100%;
width: 100%;
position: absolute;
display: flex;
justify-content: center;
align-items: center;
background-color: #f0f0f0;
`;

const SignUpForm = styled.div`
  text-align: center;
`;

const Title = styled.div`
  text-align: center;
  font: bold 55px/70px SF PRO, serif;
  letter-spacing: 0px;
  color: #292929;
  margin-bottom: 50px;
`;

const StyledInput = styled(Input)`
width:240px;
`;

const Bottom = styled.div`
  margin-top: 20px;
  text-align: center;
  font: bold 27px/36px SF PRO, serif;
  letter-spacing: 0px;
  color: #003d90;
  cursor: pointer;
`;
const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = {
  /* register, */
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(SignUp);