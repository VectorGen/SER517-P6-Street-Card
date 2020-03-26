import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Form, DatePicker, TimePicker, Button, Icon,  Cascader, Input, AutoComplete, notification, Layout, Menu, Card, Checkbox} from 'antd';
import WrappedViewAppointments from "./ViewAppointments";
import Header from './Header'
import moment from 'moment';
import StreetCardFooter from './StreetCardFooter'

const serviceProvider = [
  {
    value: "FP",
    label: "Food Pantry"
  },
  {
    value: "DIC",
    label: "Drop in Centre"
  },
  {
    value: "SH",
    label: "Shelter Home"
  },
  {
    value: "SK",
    label: "Soup Kitchen"
  }
];

const { Content, Sider } = Layout;

class EditAppointment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appointment : {},
            isLoaded: false,
        }
    this.handleSuccessfulLogoutAction = this.handleSuccessfulLogoutAction.bind(this);

    }
  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
          var appointmentRequestObject = {};
          console.log()
        appointmentRequestObject.office = values.office;
        appointmentRequestObject.streetAddress1 = values.streetAddress1;
        appointmentRequestObject.streetAddress2 = values.streetAddress2;
        appointmentRequestObject.city = values.city;
        appointmentRequestObject.zipCode = values.zipCode;
        appointmentRequestObject.state = values.state;
        appointmentRequestObject.Date = values['DatePicker'].format('YYYY-MM-DD');
        appointmentRequestObject.Time = values['TimePicker'].format('hh:mm:ss');
        appointmentRequestObject.serviceProvider = values.serviceProvider[0];
        appointmentRequestObject.personalId = this.props.homelessPersonId;
        appointmentRequestObject.alert = values.alert;

        console.log(appointmentRequestObject);
        fetch('http://127.0.0.1:8000/homeless/' + this.props.homelessPersonId + '/appointment/' + this.props.appointmentId + '/', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(appointmentRequestObject)
        })
          .then(res => res.json())
          .then(json => {
            this.props.history.push('/socialWorkerRegister');
          });
      }

      console.log('Received values of form: ', values);
    });
  };


  componentDidMount() {
     fetch('http://127.0.0.1:8000/homeless/' + this.props.homelessPersonId + '/appointment/' + this.props.appointmentId + '/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        })
         .then(res => res.json())
         .then(json => {
            console.log(json)
             this.setState({
                appointment: json,
              }
          )

         })
        console.log("Alert", this.state.appointment.alert);

  }

  onChange = e => {
    console.log('checked = ', e.target.checked);
    this.state.appointment.alert = !this.state.appointment.alert;
    console.log(this.state.appointment.alert)
  };

  handleSuccessfulLogoutAction() {
    this.props.handleLogout();
    this.props.history.push('/login');
  }

  handleClick = e => {
    if(e.key === '3'){
      this.props.updatePageComponent('newAppointMent')
      this.props.history.push('/socialWorkerRegister');
    }else if(e.key === '4'){
      this.props.updatePageComponent('viewAppointment')
      this.props.history.push('/socialWorkerRegister');
    }else if(e.key === '1'){
      this.props.updatePageComponent('registerClient')
      this.props.history.push('/socialWorkerRegister');
    }else if(e.key === '2'){
      this.props.updatePageComponent('updateInformation')
      this.props.history.push('/socialWorkerRegister');
    }else if(e.key === '5'){
      this.props.updatePageComponent('loginfo')
      this.props.history.push('/socialWorkerRegister');
    }else if (e.key === '6') {
        this.setState({pageComponent: 'projectenroll'})
        this.props.history.push('/socialWorkerRegister');
    }
  };

 

  render() {
      const {appointment} = this.state;
      const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
          },
        };
    const config = {
      rules: [{ type: 'object', required: true, message: 'Please select time!' }],
    };
    return (
        <Layout className="layout">
          <Header 
                  handleSuccessfulLogoutAction={this.handleSuccessfulLogoutAction}
                  loggedInStatus={this.props.loggedInStatus}
          />
          <Layout>
            <Sider className="site-layout-sider"
            >
              <Menu 
                style={{ borderRight : '0px', backgroundColor: '#173e43' }} 
                mode="inline" defaultSelectedKeys={['5']}
                onClick={this.handleClick}
              >
                <Menu.Item style={{ marginTop: '20px', color: '#fae596'}} key="1">
                  <span>Register Client</span>
                </Menu.Item>
                <Menu.Item style={{ marginTop: '20px', color: '#fae596'}} key="2">
                  <span>Update Client Information</span>
                </Menu.Item>
                <Menu.Item style={{ marginTop: '20px', color: '#fae596'}} key="3">
                  <span>Schedule Appointment</span>
                </Menu.Item>
                <Menu.Item style={{ marginTop: '20px', color: '#fae596'}} key="4">
                  <span>View Appointment</span>
                </Menu.Item>
                <Menu.Item style={{ marginTop: '20px', color: '#fae596'}} key="5">
                  <span>Edit Appointment</span>
                </Menu.Item>
                <Menu.Item style={{marginTop: '20px', color: '#fae596'}} key="6">
                    <span>Project Enrollment</span>
                </Menu.Item>
              </Menu>
            </Sider>
            <Content className="content">
              <div className="site-layout-content-setappointment">
                <Form {...formItemLayout} onSubmit={this.handleSubmit} className="set-appointment-form">
                <h1 style={{marginLeft : '280px'}} >Edit Details:</h1>
                  <Form.Item className="register-ant-form-item" >
                  {getFieldDecorator("serviceProvider", {
                    rules: [
                      {
                        type: "array",
                        required: true,
                        message: "Please select your role!"
                      }
                    ]
                  })(<Cascader options={serviceProvider} placeholder="Service Provider" />)}
                </Form.Item>
                <Form.Item className="register-ant-form-item" >
                  {getFieldDecorator("office", {
                    initialValue: appointment.office,
                    rules: [
                      {
                        message: "Please input the office name!",
                        whitespace: true
                      }
                    ]
                  })(<Input placeholder="Office"/>)}
                </Form.Item>
                <Form.Item className="register-ant-form-item" >
                  {getFieldDecorator("streetAddress1", {
                    initialValue: appointment.streetAddress1,
                    rules: [
                      {
                        message: "Please input the street address!",
                        whitespace: true
                      }
                    ]
                  })(<Input placeholder="Street Address 1"/>)}
                </Form.Item>
                <Form.Item className="register-ant-form-item" >
                  {getFieldDecorator("streetAddress2", {
                    initialValue: appointment.streetAddress2,
                    rules: [
                      {
                        message: "Please input the street address!",
                        whitespace: true
                      }
                    ]
                  })(<Input placeholder="Street Address 2"/>)}
                </Form.Item>
                <Form.Item className="register-ant-form-item" >
                  {getFieldDecorator("city", {
                    initialValue: appointment.city,
                    rules: [
                      {
                        message: "Please input the city!",
                        whitespace: true
                      }
                    ]
                  })(<Input placeholder="City"/>)}
                </Form.Item>
                <Form.Item className="register-ant-form-item" >
                  {getFieldDecorator("zipCode", {
                    initialValue: appointment.zipCode,
                    rules: [
                      {
                        message: "Please input the zip code!",
                        whitespace: true
                      }
                    ]
                  })(<Input placeholder="Zip Code"/>)}
                </Form.Item>
                <Form.Item className="register-ant-form-item" >
                  {getFieldDecorator("state", {
                    initialValue: appointment.state,
                    rules: [
                      {
                        message: "Please input the state!",
                        whitespace: true
                      }
                    ]
                  })(<Input placeholder="State"/>)}
                </Form.Item>
                  <Form.Item className="register-ant-form-item" >
                  {getFieldDecorator('DatePicker', {
                  initialValue: appointment.Date ? moment(appointment.Date, 'YYYY/MM/DD') : moment("1999-12-01", 'YYYY/MM/DD'),
                    rules: [
                      {
                        type: "object",
                        required: true,
                        message: "Please input your Date!"
                      }
                    ]
                  })(<DatePicker placeholder="Appointment Date"/>)}
                </Form.Item>
                  <Form.Item className="register-ant-form-item" >
                  {getFieldDecorator('TimePicker', {
                    initialValue: appointment.Time ? moment(appointment.Time, 'hh:mm:ss') : moment("00-00-00", 'hh:mm:ss'),
                    rules: [
                      {
                        type: "object",
                        required: true,
                        message: "Please input your Time!"
                      }
                    ]
                  })(<TimePicker placeholder="Time Date" />)}
                </Form.Item>
          
                <Form.Item className="register-ant-form-item" >
                  {console.log(appointment.alert)}
                  <Checkbox checked={appointment.alert}  onChange={this.onChange}>
                  Alert
                  </Checkbox>  
                </Form.Item>
                <Form.Item className="register-ant-form-item">
                  <Button type="primary" htmlType="submit" className="registration-submit-button">
                    Submit
                  </Button>
                </Form.Item>
                </Form>
              </div>
              </Content>
          </Layout>
          <StreetCardFooter/>
        </Layout>
    );
  }
}

const WrappedEditAppointment = Form.create({ name: 'time_related_controls' })(EditAppointment);


export default WrappedEditAppointment;
