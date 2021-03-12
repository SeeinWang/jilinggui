import React, { Component } from "react";
import { withRouter,Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "recompose";
import styled from "styled-components";
import { login } from "../action/user";
import { Form, Input, Button } from "antd";

//firebase
import Firebase from "../util/firebase";

class SignIn extends Component {
    state = { userVerified: false };
  
    onFinish = (values) => {
      const { history } = this.props;
      console.log(values, "login");
      const { email, password } = values;
  
      Firebase.auth()
        .signInWithEmailAndPassword(email, password)
        // handle success
        .then((data) => {
            Firebase.firestore()
              .collection("users")
              .doc(data.user.uid)
              .get()
              .then((doc) => {
                var profile = doc.data();
                console.log(profile);
                this.props.login(profile, data.user.uid);
                history.push("/");
              });
            })
    };
  
    toSignUp = () => {
      this.props.history.push("/signup");
    };
    render() {
      return (
        <Container>
          <SignUpForm>
            <Title>Login</Title>
            <Form
              style={{ margin: "0 auto" }}
              name="nest-messages"
              onFinish={this.onFinish}
            >
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
                  login
                </Button>
              </Form.Item>
            </Form>
            <Bottom onClick={this.toSignUp}>New User? Sign Up Here</Bottom>
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
    login,
  };
  
  export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
  )(SignIn);