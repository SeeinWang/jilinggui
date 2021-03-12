import React, { Component } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import "antd/dist/antd.css";
import { PersistGate } from "redux-persist/integration/react";
import styled from "styled-components";
import Home from './components/home';
import Login from './components/login';
import SignUp from './components/signup';

import {isMobile} from 'react-device-detect';

class App extends Component {
  render() {
    if(isMobile){
      return <MobileContainer>
      <Title>
        This App is only available on Desktop. Mobile App is Coming Soon!
      </Title>
    </MobileContainer>
    }
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={SignUp} />
            </Switch>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    );
  }
}

const MobileContainer = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction:column;
`;

const Title = styled.div`
margin-top:20px;
font-family: SF PRO, serif;
font-style: normal;
font-weight: bold;
font-size: 30px;
line-height: 68px;
letter-spacing: 0.04em;
text-align: center;
margin-bottom:50px;
width:350px;
`;

export default App;

