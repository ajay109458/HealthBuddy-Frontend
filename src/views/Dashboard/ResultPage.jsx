import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Button from "components/CustomButtons/Button.jsx";
// @material-ui/icons
import ContentCopy from "@material-ui/icons/ContentCopy";
import Store from "@material-ui/icons/Store";
import InfoOutline from "@material-ui/icons/InfoOutline";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import Table from "components/Table/Table.jsx";
import Tasks from "components/Tasks/Tasks.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import { bugs, website, server } from "variables/general";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

import Details from "./Details.jsx"

class ResultPage extends React.Component {
  state = {
    value: 0,
    file: this.props.reportFile,
    medicalTestReport: null,
    error: null,
    selectedTest: null
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  componentDidMount() {
    this.uploadUsingFormData();
  }

  handleResult = (responseData) => {
    console.log(responseData);
    this.setState({medicalTestReport: JSON.parse(responseData)});
  }

  handleError= (responseData) => {
    this.setState({error:responseData});
  }

  onBack = () =>  {
    this.setState({selectedTest:null});
  }

  uploadUsingFormData = () => {
    var formData = new FormData();

    // HTML file input, chosen by user
    formData.append("file", this.state.file);

    var request = new XMLHttpRequest();
    var handleResponseMethod = this.handleResult;
    var handleErrorMethod = this.handleError;
    request.onreadystatechange = function() {//Call a function when the state changes.
      if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        handleResponseMethod(this.response);
      } else {
        handleErrorMethod(this.response);
      }
    }
    request.open("POST", "http://ajya-pc04:9000/MedicalRecommendationEngine/rest/reportanalyzer/uploadReport");
    request.send(formData);
    
  }

  isError = () => {
    return !!this.state.error;
  }

  isMedicalTestResultVisible = () => {
    return this.state.medicalTestReport != null;
  }

  getSuggestionTable = () => {
    var result = [];

    this.state.medicalTestReport.abnormalMedicalTests.forEach(element => {
      result.push([element.name, element.observedValue, element.unit, (element.dangerPercentage < 0) ? "DEFICIENT" : "ABUNDANT", this.calculateRiskFactor(element.dangerPercentage), this.getSuggestion(element), this.getButton(element) ])
    });

    return result;
  }

  getMostRiskyTest = () => {
    var riskyTest = "None";

    var riskyPercentage = 0;

    this.state.medicalTestReport.abnormalMedicalTests.forEach(element => {
       if (Math.abs(element.dangerPercentage) > riskyPercentage) {
         riskyTest = element.name;
         riskyPercentage = Math.abs(element.dangerPercentage);
       }
    });

    return riskyTest;
  }

  getSuggestion = (medicalTest) =>  {
    if(medicalTest.dangerPercentage < 0) {
      return medicalTest.suggestion.lowSuggestion;
    } else {
      return medicalTest.suggestion.highSuggestion;
    }
  }

  handleDetailView = (element) => {
    this.setState({selectedTest: element});
  }

  getButton = (element) => {
    return (<Button color="primary" additionalData onClick={() => this.handleDetailView(element)} >View</Button>);
  }

  calculateRiskFactor = (value) => {
    value = Math.abs(value);
    
    if (value <= 25) {
      return "LOW";
    } else if (value <= 50){
      return "MEDIUM";
    } else if (value <= 75) {
      return "HIGH"
    } else {
      return "VERY RISKY";
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.state.selectedTest == null ? (
          <div>
            {this.isMedicalTestResultVisible() ? (
              <div>
                <Card>
                  <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>{this.state.medicalTestReport.user.userName}</h4>
                    <p className={classes.cardCategoryWhite}>
                      {this.state.medicalTestReport.user.userAge} Yrs ({this.state.medicalTestReport.user.isUserMale ? "MALE" : "FEMALE"})
                    </p>
                  </CardHeader>
                  <CardBody>
                  </CardBody>
                </Card>  
                <Grid container>
                <GridItem xs={12} sm={6} md={3}>
                  <Card>
                    <CardHeader color="info" stats icon>
                      <CardIcon color="info">
                        <Accessibility />
                      </CardIcon>
                      <p className={classes.cardCategory}>Total Tests</p>
                      <h3 className={classes.cardTitle}>{this.state.medicalTestReport.totalTests}</h3>
                    </CardHeader>
                  </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={3}>
                  <Card>
                    <CardHeader color="success" stats icon>
                      <CardIcon color="success">
                        <Store />
                      </CardIcon>
                      <p className={classes.cardCategory}>Perfect Tests</p>
                      <h3 className={classes.cardTitle}>{this.state.medicalTestReport.totalTests - this.state.medicalTestReport.abnormalMedicalTests.length}</h3>
                    </CardHeader>
                  </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={3}>
                  <Card>
                    <CardHeader color="warning" stats icon>
                      <CardIcon color="warning">
                        <ContentCopy />
                      </CardIcon>
                      <p className={classes.cardCategory}>Abnormal Tests</p>
                      <h3 className={classes.cardTitle}>
                      {this.state.medicalTestReport.abnormalMedicalTests.length}
                      </h3>
                    </CardHeader>
                  </Card>
                </GridItem>
                
                <GridItem xs={12} sm={6} md={3}>
                  <Card>
                    <CardHeader color="danger" stats icon>
                      <CardIcon color="danger">
                        <InfoOutline />
                      </CardIcon>
                      <p className={classes.cardCategory}>Most risky test</p>
                      <h3 className={classes.cardTitle}>{this.getMostRiskyTest()}</h3>
                    </CardHeader>
                  </Card>
                </GridItem>
              </Grid>
              <Grid>
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardHeader color="warning">
                    <h4 className={classes.cardTitleWhite}>Abnormal Test Report</h4>
                  </CardHeader>
                  <CardBody>
                    <Table
                      tableHeaderColor="warning"
                      tableHead={["Name", "Observed Value", "Unit", "Amount", "Risk Factor", "Suggestion", "Details"]}
                      tableData={this.getSuggestionTable()}
                    />
                  </CardBody>
                </Card>
              </GridItem>
            </Grid>
            </div> 
            ) : (
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>{this.isError() ? "Unable to fetch report." : "Analyzing report..."} </h4>
                </CardHeader>
                <CardBody>
                  <h2>{this.isError() ? "Seems to be some issue. We are currently working on this." : "Please wait... we are processing your report."} </h2>
                </CardBody>
              </Card>
            )} 
          </div>) : (
            <div>
              <Details onBack={this.onBack} element={this.state.selectedTest}/>
            </div>
          )} 
      </div>
    );
  }
}

ResultPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(ResultPage);
