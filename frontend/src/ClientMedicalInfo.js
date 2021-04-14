import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import {Alert, Collapse, Descriptions, Form, Layout, Button} from 'antd';
import Header from './Header'
import StreetCardFooter from './StreetCardFooter'
import moment from "moment";
import OauthPopup from 'react-oauth-popup'

const {Content} = Layout;
const {Panel} = Collapse;

class ClientPersonalInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clientInfo: this.props.homelessData,
            isLoaded: false,
            appointment: {},
        }
        this.handleSuccessfulLogoutAction = this.handleSuccessfulLogoutAction.bind(this)
    }


    handleSuccessfulLogoutAction() {
        this.props.handleLogout();
        this.props.history.push('/login');
    }

    OAuthOnCode(code, params) {
        console.log("OAuth Code: ", code);
        console.log("OAuth Params: ", params);
    }
    
    OAuthOnClose() {
        console.log('OAuthOnClose')
    }

    render() {
        let race;
        switch (this.state.clientInfo.Race) {
            case 1:
                race = "American India or Alaskan Native";
                break;
            case 2:
                race = "Asian";
                break;
            case 3:
                race = "Black or African American";
                break;
            case 4:
                race = "Native Hawaiian or Pacific Islander";
                break;
            case 5:
                race = "White";
                break;
            case 8:
                race = "Client Doesn\'t Know";
                break;
            case 9:
                race = "Client Refused";
                break;
            case 99:
                race = "Data Not Collected";
                break;
        }
        let ethnicity;
        switch (this.state.clientInfo.Ethnicity) {
            case 0:
                ethnicity = "Non Hispanic/Non Latino";
                break;
            case 1:
                ethnicity = "Hispanic/Latino";
                break;
            case 8:
                ethnicity = "Client Doesn\'t Know";
                break;
            case 9:
                ethnicity = "Client Refused";
                break;
            case 99:
                ethnicity = "Data Not Collected";
                break;
        }
        let gender;
        switch (this.state.clientInfo.Gender) {
            case 0:
                gender = "Female";
                break;
            case 1:
                gender = "Male";
                break;
            case 3:
                gender = "Trans Female";
                break;
            case 4:
                gender = "Trans Male";
                break;
            case 5:
                gender = "Gender Non-Conforming";
                break;
            case 8:
                gender = "Client Doesn\'t Know";
                break;
            case 9:
                gender = "Client Refused";
                break;
            case 99:
                gender = "Data Not Collected";
                break;
        }
        let veteranStatus;
        switch (this.state.clientInfo.VeteranStatus) {
            case 0:
                veteranStatus = "No";
                break;
            case 1:
                veteranStatus = "Yes";
                break;
            case 8:
                veteranStatus = "Client Doesn\'t Know";
                break;
            case 9:
                veteranStatus = "Client Refused";
                break;
            case 99:
                veteranStatus = "Data Not Collected";
                break;
        }

        const formItemLayout = {
            labelCol: {
                xs: {span: 10},
                sm: {span: 2}
            },
            wrapperCol: {
                xs: {span: 10},
                sm: {span: 6}
            }
        };

        /**
        * Below are placeholders for EHRs gathered from Open Epic. 
        * 
        * In producation, EHRs should be pushed to this.state.electronicHealthReacords 
        * during the OAuth callback.
        * 
        */
        let ehrPlaceholder = [
            {
                name: "AdverseEvent",
                description: "The AdverseEvent resource returns data about an event that \
                caused unintended physical injury resulting from or contributed to by medical \
                care, a research study, or other healthcare setting factors. These events \
                might require additional monitoring, treatment, or hospitalization, or might \
                result in the death of a patient.",
                items: []
            },
        
            {
                name: "AllergyIntolerance",
                description: "The FHIR AllergyIntolerance resource defines clinical information \
                about a patient's allergic response to a substance. The AllergyIntolerance \
                resource defines the substance that elicited the response, as well as when the \
                reaction occured, the severity, and the type of reaction noted. The \
                AllergyIntolerance resource can also accommodate search by ID and by patient, \
                allowing it to return a list of allergies. If a patient has no active allergies, \
                an AllergyIntolerance resource will be returned indicating whether the patient's \
                allergies have never been reviewed (are not on file), or if they have been reviewed \
                and it has been determined that they have no known allergies.",
                items: []
            },
        
            {
                name: "CarePlan",
                description: "The FHIR CarePlan resource is a broad container for summarizing the \
                plan of treatment for a patient. It includes links to the Condition resource (the \
                    patient's long term Problem List) and the Goal resource (the patient's \
                    longitudinal goals) as well as in-line detail about upcoming appointments, \
                    referral orders, and upcoming orders. The CarePlan resource is designed for \
                    provider planning and documentation, not patient interaction. This resource is \
                    also designed for stating specific activities related to a single patient, rather \
                    than generic protocols for condition treatment (a Protocol resource will be defined \
                    in a later version of FHIR). By default, only the patient's longitudinal \
                    CarePlan is returned. However, encounter-level CarePlans can also be requested. \
                    These encounter-level CarePlans include narrative content, such as patient i\
                    nstructions, and assassment and plan of treatment notes that are not associated \
                    with any particular condition.",
                items: []
            },
        
            {
                name: "Coverage",
                description: "Retrieves a Coverage resource by its FHIR ID. Coverage resources correspond \
                to coverage records in Epic.",
                items: []
            },
        
            {
                name: "Device",
                description: "The FHIR Device resource describes information about a specific patient's \
                durable, manufactured medical items. The below documentation describes only medical devices \
                implanted in a patient.",
                items: []
            },
        
            {
                name: "FamilyMemberHistory",
                description: "Returns the medical and surgical history of a patient's relatives using RESTful \
                URLs. For now, we only support Search by FHIR Patient ID, which will return all FamilyMemberHistory \
                resources associated with a single patient.",
                items: []
            },
            
            {
                name: "Immunization",
                description: "The FHIR Immunization Resource provides information about a patient's immunizations, \
                including the vaccine administered and details regarding the administration.",
                items: []
            },
        
            {
                name: "Medication",
                description: "The FHIR Medication resource defines detailed information about a medication order's \
                product or package. The Medication resource is not specific to any patient.",
                items: []
            },
        
            {
                name: "Observation",
                description: "The FHIR Observation resource defines information about a measurement or simple assertion \
                made about a patient. The below documentation describes how the Observation resource is used to describe \
                analyte level result information or sensitivities and isolates from a microbiology analysis.",
                items: []
            },
        
            {
                name: "Practitioner",
                description: "The FHIR Practitioner resource defines demographics and identifiers for care providers at a \
                health care organization. The Practitioner resource supplements many of the resources within FHIR by \
                providing information about a primary care provider, prescriber, or the clinician in volved in ordering a \
                diagnostic test for a patient.",
                items: []
            },
        
            {
                name: "Procedure",
                description: "The FHIR Procedure resource defines an activity performed on or with a patient as part of \
                the provision of care. It corresponds with surgeries and procedures performed, including endoscopies and \
                biopsies, as well as less invasive actions like counseling and physiotherapy. This resource is designed for \
                a high-level summary around the occurrence of a procedure, and not for specific procedure log documentation. \
                The below documentation describes surgical, dental, and diagnostic procedures performed at a particular \
                organization, but does not include historical documentation of procedures on a patient.",
                items: []
            },
        
            {
                name: "RelatedPerson",
                description: "The FHIR RelatedPerson resource is typically an entity with a personal or professional relationship \
                to the patient. RelatedPersons are often a source of information about the patient. For integrations with Epic, \
                the RelatedPerson is represented by a MyChart account record ID and their link to a Patient record ID. Typically \
                the RelatedPerson represents a MyChart proxy for the patient.",
                items: []
            }
        ]

        /**
         * An array of Electronic Health Records
         */
        const ehrs = []
        let key = 1
        ehrPlaceholder.forEach(ehr => {
            ehrs.push(
                <Collapse>
                    <Panel header={ ehr.name } key={ key }>
                        <h3>Description</h3>
                        <p>{ ehr.description }</p>
                        {ehr.items.forEach(item => {
                            /** Code to display paritcular item, it would be nice if given in generalities */
                            return
                        })}
                    </Panel>
                </Collapse>
            )
            key++
        })
        
        return (
            <Layout>
                <Header
                    handleSuccessfulLogoutAction={this.handleSuccessfulLogoutAction}
                    loggedInStatus={this.props.loggedInStatus}
                />
                <Content className="content-login">
                    <div className="site-layout-content-login">
                        <div style={{textAlign: "left"}}>
                            <Descriptions title="Personal Information" bordered
                                          column={{xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1}}>
                                <Descriptions.Item
                                    label="Full Name">{this.state.clientInfo.FirstName} {this.state.clientInfo.MiddleName} {this.state.clientInfo.LastName} {this.state.clientInfo.NameSuffix}</Descriptions.Item>
                                <Descriptions.Item
                                    label="Social Security Number">{this.state.clientInfo.SSN}</Descriptions.Item>
                                <Descriptions.Item
                                    label="Date of Birth">{moment(this.state.clientInfo.DOB).format("MM/DD/YYYY")}</Descriptions.Item>
                                <Descriptions.Item label="Race">{race}</Descriptions.Item>
                                <Descriptions.Item label="Ethnicity">{ethnicity}</Descriptions.Item>
                                <Descriptions.Item label="Gender">{gender}</Descriptions.Item>
                                <Descriptions.Item label="Veteran Status">{veteranStatus}</Descriptions.Item>
                                <Descriptions.Item
                                    label="Phone Number">{this.state.clientInfo.PhoneNumberPrefix} {this.state.clientInfo.PhoneNumber}</Descriptions.Item>
                                <Descriptions.Item label="Email">{this.state.clientInfo.Email}</Descriptions.Item>
                            </Descriptions>
                        </div>

                        <OauthPopup
                        // TODO: OAuth logic
                        url="https://fhir.epic.com/interconnect-fhir-oauth/oauth2/authorize?scope=launch&response_type=code&redirect_uri=localhost&client_id=186c09d3-8833-4ab0-a9b4-1ee3a8845b9d"
                        onCode={this.OAuthOnCode}
                        onClose={this.OAuthOnClose}
                        >
                        <Button type="primary" id="get-electronic-health-records">Get Medical Health Records</Button>
                        </OauthPopup>
                        
                        {/*
                        *   The div below should only be displayed on succesful OAuth connection and after callback has 
                        *   set the data inside. EHRs has the potential to be in the application state
                        */}
                        <div id="electronic-health-records">
                            {ehrs}
                        </div>

                    </div>
                </Content>
                <StreetCardFooter/>
            </Layout>


        )
            ;

    }
}


const
    WrappedClientPersonalInfo = Form.create({name: "clientLanding"})(
        ClientPersonalInfo
    );

export default WrappedClientPersonalInfo;
