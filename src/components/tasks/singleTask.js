import React, { Component } from "react";
import styled from "styled-components";
import moment from "moment";

class SingleTask extends Component{
    render(){
        const {deadline, title, createdAt, content, status} = this.props.todo;
        const start = moment(createdAt).format("MMM Do YYYY, HH:mm");
        const end = moment(deadline).format("MMM Do YYYY, HH:mm");
        return (
            <Container>
                <Title>{title}</Title>
                <TimeContainer>
                <CreatedAt>Start:{start}</CreatedAt>
                <Deadline>Deadline:{end}</Deadline>
                </TimeContainer>
            </Container>
        )
    }
}

const Container = styled.div`
background:white;
width:90%;
margin:10px auto;
min-height:100px;
height:auto;
padding:10px;
display:flex;
flex-direction:column;
justify-content:space-between;
`;

const Title = styled.div`
    text-align: left;
    font: normal 18px Open Sans;
    letter-spacing: 0px;
    color:#808080;
`;

const TimeContainer = styled.div`
display:flex;
flex-direction:column;
`;

const CreatedAt = styled.div`
font: normal 14px Open Sans;
letter-spacing: 0px;
color: #003d90;
margin-bottom:2px;
`;

const Deadline = styled.div`
font: normal 14px Open Sans;
letter-spacing: 0px;
color: red;
`;



export default SingleTask;