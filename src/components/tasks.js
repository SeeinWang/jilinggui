import React, { Component } from "react";
import styled from "styled-components";
import { Row, Col, Button } from 'antd';
import { connect } from "react-redux";
import Firebase from "../util/firebase";
import AddTaskModal from './tasks/addTaskModal';
import SingleTask from './tasks/singleTask';

class Tasks extends Component{
    state = {
        todos:[],
        addModalOpen:false
    }
    componentDidMount(){
        this.fetchTodo();
   }

   fetchTodo = async () => {
    const {user} = this.props;
    let me = this;
    Firebase.firestore()
    .collection("todos")
    .where('owner_id','==', user.id)
    .onSnapshot(function (querySnapshot) {
      let todos = [];
      querySnapshot.forEach(function (doc) {
        const todo = {
          ...doc.data(),
          matchId: doc.id,
        };
        todos.push(todo);
      });
      me.setState({
          todos
      })
    });
   }

   openAddModal = () => {
       this.setState({
           addModalOpen:true
       })
   }
   closeAddModal = () => {
    this.setState({
        addModalOpen:false
    })
}
    render(){
        const todos = this.state.todos.filter(item => item.status === 0);
        return (
        <Container>
            <AddTaskModal addModalOpen={this.state.addModalOpen} closeModal={this.closeAddModal} />
            <Button type="primary" style={{borderRadius:'3px'}} onClick={this.openAddModal}>Add New Task</Button>
   <Row style={{marginTop:'20px'}} gutter={16}>
      <Col style ={{padding:20}} span={8}>
          <ColContainer>
            <Title>To dos</Title>
            {
                todos.map((todo) => <SingleTask todo={todo} />)
            }
          </ColContainer>
      </Col>
      <Col style ={{padding:20}} span={8}>
      <ColContainer>
        <Title>In progress</Title>
      </ColContainer>
      </Col>
      <Col style ={{padding:20}} span={8}>
      <ColContainer>
        <Title>Done</Title>
      </ColContainer>
      </Col>
    </Row>
    </Container>
        )
    }
}
const Container = styled.div`
height: 100%;
width: 100%;
`;

const ColContainer = styled.div`
background:#F5F5F5;
border-radius:5px;
padding-bottom:50px;
`;

const Title = styled.div`
font: bold 20px/22px Open Sans;
padding:10px;
color:#808080;
`;

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(Tasks);

