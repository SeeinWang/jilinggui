import React, { Component } from "react";
import { withRouter,Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "recompose";
import styled from "styled-components";
import { Layout, Menu } from 'antd';
import Tasks from './tasks';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  CodeOutlined ,
  CopyOutlined,
  CoffeeOutlined,
} from '@ant-design/icons';


const { Header, Sider, Content } = Layout;

class Home extends Component{
    state = {
        collapsed: false,
        current:'1'
    }
    toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
      };
    handleClick = e => {
    this.setState({
        current: e.key,
    });
    };
    render(){
        const {user} = this.props;
        const {profile} = user;
        const {first_name} = profile;
        if(!this.props.user.loggedIn){
            return <Redirect to="/login" />
        }
        return (
            <Container>
                <Title> Welcome to {first_name}'s notebook</Title>
                <Layout style={{height:'90%', padding:'10px'}}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onClick={this.handleClick} selectedKeys={[this.state.current]}>
            <Menu.Item key="1" icon={<CodeOutlined />} >
              My Tasks
            </Menu.Item>
            <Menu.Item key="2" icon={<CopyOutlined />}>
              My notes
            </Menu.Item>
            <Menu.Item key="3" icon={<CoffeeOutlined />}>
              My stories
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            {
                this.state.current === '1' && <Tasks />
            }
          </Content>
        </Layout>
      </Layout>
            </Container>
        )
    }
}

const Title = styled.div`
  text-align: left;
  font: bold 35px/45px Open Sans;
  letter-spacing: 0px;
  color: #003d90;
  margin:10px 10px;
`;

const Container = styled.div`
height: 100%;
width: 100%;
position: absolute;
display: flex;
flex-direction:column;
`;

const mapStateToProps = ({ user }) => ({ user });

export default compose(
    withRouter,
    connect(mapStateToProps)
  )(Home);