import React, { Component } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import Firebase from "../../util/firebase";
import {TaskForm} from './taskForm';
import moment from "moment";
import { connect } from "react-redux";

class AddTaskModal extends Component{
    createOrEditTask = (values) => {
        console.log(values);
        const { user } = this.props;
        const owner_id = user.id;
         const { title, content, deadline } = values;
         const end_time = moment(deadline).format();
         const newTodo = {
             owner_id,
             title,
             content,
             createdAt: moment().format(),
             deadline:end_time,
             status:0
         }
         Firebase.firestore()
      .collection("todos")
      .add(newTodo)
      .then((res) => {
        this.props.closeModal();
      })
      .catch((error) => console.log(error, "error"));
    }
    render(){
        const customStyles = {
            content: {
              top: "20%",
              margin: "0 auto",
              bottom: "auto",
              width: "650px",
              height: "auto",
              background: "#FFFFFF 0% 0% no-repeat padding-box"
            },
          };
        const {addModalOpen} = this.props;
        return (
            <Modal
            isOpen={addModalOpen}
            style={customStyles}
            onRequestClose={this.props.closeModal}
            ariaHideApp={false}
          >
           <Container>
               <Title>Add new task</Title>
               <TaskForm createOrEditTask={this.createOrEditTask} />
           </Container>
          </Modal>
        )
    }
}

const Container = styled.div`
padding:20px;
display:flex;
flex-direction:column;
`;

const Title = styled.div`
text-align: center;
    font: bold 30px/40px Open Sans;
    letter-spacing: 0px;
    color: #003d90;
`;


const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(AddTaskModal);