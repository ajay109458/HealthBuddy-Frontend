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




import DownshiftMultiple from "components/CustomInput/DownshiftMultiple.jsx";




import { bugs, website, server } from "variables/general";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class Symptoms extends React.Component {
  state = {
    symptoms: [],
    selectedSymptoms: []
  };

  selectedSymptomsList = [];

  componentDidMount() {
    fetch("http://ajya-pc04:9000/MedicalRecommendationEngine/rest/symptomsController/symptoms")
     .then(result=>result.json())
     .then(item=> {
       this.setState({symptoms: item});
     });
  }

  onListUpdate = (selectedSymptoms) => {

    this.selectedSymptomsList = selectedSymptoms;
    
  }

  onSubmit = () => {
    this.props.onChange(this.selectedSymptomsList);
  }

  render() {
    const { classes } = this.props;
    
    return (
      <div>
          <Grid container>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Symptoms Details</h4>
                  <p className={classes.cardCategoryWhite}>Provide your symptoms</p>
                </CardHeader>
                <CardBody>
                  <Grid xs={12} sm={12} md={12}>
                    <DownshiftMultiple placeholder="Select symptoms" suggestionList={this.state.symptoms} onUpdate={this.onListUpdate}/>
                  </Grid>
                  
                </CardBody>
                <CardFooter>
                  <Grid xs={12} sm={12} md={11}>
                  </Grid>
                  <Grid xs={12} sm={12} md={1}>
                    <Button onClick={this.onSubmit} lableStyle={{float: 'right'}} color="primary">Submit</Button>
                  </Grid>               
                </CardFooter>
              </Card>
            </GridItem>
          </Grid>
          
      </div>
    );
  }
}

Symptoms.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Symptoms);
