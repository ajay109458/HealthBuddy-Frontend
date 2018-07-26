import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
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
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
import Dropzone from 'react-dropzone'
import Button from "components/CustomButtons/Button.jsx";


import { bugs, website, server } from "variables/general";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class ReportUpload extends React.Component {
  state = {
    value: 0,
    files: [],
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  onDrop = (files) => {
    this.setState({
      files: files
    });
  }

  isFileUploaded = () => {
    return this.state.files.length > 0;
  }

  onUpload = () => {
    this.props.onChange(this.state.files[0]);
  }

  

  render() {
    const { classes } = this.props;
    return (
      <div>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Analyze Medical Reports</h4>
              <p className={classes.cardCategoryWhite}>
                Detect anomalies in your medical report and provide suggestions.
              </p>
            </CardHeader>
            <CardBody>
              <Grid container>
                <GridItem xs={12} sm={12} md={6}>
                  <h2> Upload your medical report</h2>
                  <Dropzone multiple={false} onDrop={this.onDrop.bind(this)} >
                    Drag-drop file or click to upload.
                  </Dropzone>
                  { 
                    this.isFileUploaded() ? (<h4> File {this.state.files[0].name} uploaded sucessfully. </h4>): <br/>
                  }
                  
                  <Button color="primary" onClick={this.onUpload} disabled={!this.isFileUploaded()}>Upload Report</Button>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <SnackbarContent
                    message={
                      'DETECT - Get anomalies with risk percentage'
                    }
                    close
                    color="info"
                  />
                  <SnackbarContent
                    message={
                      'HEALTHY - Ways to remain healthy'
                    }
                    close
                    color="success"
                  />
                  <SnackbarContent
                    message={
                      'COUNT - Count of anomalies in your report.'
                    }
                    close
                    color="warning"
                  />
                  <SnackbarContent
                    message={
                      'RISK - Guide about any kind of risk.'
                    }
                    close
                    color="danger"
                  />
                  <SnackbarContent
                    message={
                      'PREVENTION - Suggestion to bring health to normal.'
                    }
                    close
                    color="primary"
                  />
                </GridItem>
              </Grid>
            </CardBody>
          </Card>
      </div>
    );
  }
}

ReportUpload.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(ReportUpload);
