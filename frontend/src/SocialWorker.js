import React from 'react';
import 'antd/dist/antd.css';
import './index.css';

class SocialWorker extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

        if (this.props.loggedInStatus === "LOGGED_IN") {
            var localClearanceLevel = '';
            var localserviceProvider = '';
            var localdegreeLevel = '';
            var localfullName = '';
            fetch(process.env.REACT_APP_IP + 'user/' + this.props.username + '/', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            })
                .then(res => res.json())
                .then(json => {

                    localClearanceLevel = json.user.socialWorker.clearanceLevel;
                    localserviceProvider = json.user.socialWorker.serviceProvider;

                    this.setState({
                        clearanceLevel: localClearanceLevel,
                        serviceProvider: localserviceProvider,
                    });

                    console.log(this.props)
                    console.log(this.state)

                    this.props.method(this.state.clearanceLevel, this.state.serviceProvider, this.state.degreeLevel, this.state.fullName);
                    if (this.state.clearanceLevel == "caseworker") {
                        this.props.history.push('/socialWorkerRegister');
                    } else if (this.state.clearanceLevel == "client") {
                        this.props.history.push('/clientLanding');
                    } else if (this.state.clearanceLevel == "service_provider") {
                        this.props.history.push('/serviceProvider');
                    } else if (this.state.clearanceLevel == "admin") {
                        this.props.history.push('/socialWorkerRegister');
                    } else if (this.state.clearanceLevel == "nurse") {
                        this.props.history.push('/medicalPersonnelLanding');
                    } else if (this.state.clearanceLevel == "treating_physician") {
                        this.props.history.push('/medicalPersonnelLanding');
                    } else if (this.state.clearanceLevel == "psychiatrist") {
                        this.props.history.push('/medicalPersonnelLanding');
                    }
                    else if (this.state.clearanceLevel == "intakeWorker") {
                        this.props.history.push('/medicalPersonnelLanding');
                    }
                    else {
                        this.props.history.push('/greeter');
                    }
                });
        } else {
            this.props.history.push('/socialWorkerRegister');
        }
    }


    render() {
        return (<div></div>);
    }
}


export default SocialWorker;
