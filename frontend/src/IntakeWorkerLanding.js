import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import {Button, Form, Icon, Input, Layout, Spin} from 'antd';
import Header from './Header'
import StreetCardFooter from './StreetCardFooter'

const {Content} = Layout;


class intakeWorkerLanding extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            items: {},
            isLoaded: false,
            isClicked: false
        }
        this.handleSuccessfulLogoutAction = this.handleSuccessfulLogoutAction.bind(this);
    }

    handleSubmit = e => {
        this.state.isClicked = true
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {

            if (!err) {
                fetch(process.env.REACT_APP_IP + 'homeless/' + values.personId + '/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                    .then(res => {
                        if (res.status == 200) {
                            this.setState({
                                isLoaded: true,
                                isClicked: false
                            })
                            res.json().then(json => {
                                this.props.handleHomelessPersonJson(json);
                                this.props.history.push('/clientInfo');
                            })
                        } else if (Math.round(res.status / 100) == 4) {
                            if (window.confirm("Error, invalid client id: " + (res.status).toString())) {
                                this.state.isClicked = false
                                this.props.history.push('/intakeWorkerLanding');
                            }
                            else{
                                this.state.isClicked = false
                                this.props.history.push('/intakeWorkerLanding');
                            }

                        } else if (Math.round(res.status / 100) == 5) {
                            if (window.confirm("Server Error: " + (res.status).toString())) {
                                this.state.isClicked = false
                                this.props.history.push('/intakeWorkerLanding');
                            }
                            else{
                                this.state.isClicked = false
                                this.props.history.push('/intakeWorkerLanding');
                            }
                        }
                    })
            }
        });
    };


    handleSuccessfulLogoutAction() {
        this.props.handleLogout();
        this.props.history.push('/login');
    }

    render() {
        const {name} = this.state;
        const {isLoaded} = this.state;
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8}
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16}
            }
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0
                },
                sm: {
                    span: 16,
                    offset: 8
                }
            }
        };

        if (this.state.isClicked == false) {
            return (
                <Layout>

                    <Header
                        handleSuccessfulLogoutAction={this.handleSuccessfulLogoutAction}
                        loggedInStatus={this.state.loggedInStatus}
                    />
                    <Content className="content-login">
                        <div className="site-layout-content-login">
                            <h1>Hello Intake Worker!</h1>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Item>
                                    {getFieldDecorator('personId', {
                                        rules: [{
                                            required: true,
                                            message: " Please input Client's Identification!"
                                        }],
                                    })(
                                        <Input
                                            prefix={<Icon type="user" style={{
                                                color: 'rgba(0,0,0,.25)',
                                                fontSize: "12px"
                                            }}/>}
                                            placeholder="Enter Client Identification"
                                        />,
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        Continue
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </Content>
                    <StreetCardFooter/>
                </Layout>
            );
        } else if (this.state.isClicked == true) {
            return (
                <Layout>

                    <Header
                        handleSuccessfulLogoutAction={this.handleSuccessfulLogoutAction}
                        loggedInStatus={this.state.loggedInStatus}
                    />
                    <Content className="content-login">
                        <div className="site-layout-content-login">
                            <span>Loading. . <Spin/></span>
                        </div>
                    </Content>
                    <StreetCardFooter/>
                </Layout>
            );
        }

    }
}


const WrappedintakeWorkerintakeWorkerLanding = Form.create({name: "intakeWorkerLanding"})(
    intakeWorkerLanding
);

export default WrappedintakeWorkerintakeWorkerLanding;