import React, { Component } from "react";
import { withRouter,Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "recompose";
import styled from "styled-components";


class Home extends Component{
    state = {

    }
    render(){
        if(!this.props.user.loggedIn){
            return <Redirect to="/login" />
        }
        return (
            <div>home</div>
        )
    }
}

const mapStateToProps = ({ user }) => ({ user });

export default compose(
    withRouter,
    connect(mapStateToProps)
  )(Home);