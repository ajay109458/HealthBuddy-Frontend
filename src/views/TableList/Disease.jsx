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

import { bugs, website, server } from "variables/general";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts";

// ##############################
// // // variables used to create animation on charts
// #############################
var delays = 80,
  durations = 500;
var delays2 = 80,
  durations2 = 500;


var diseaseChart = {
  data: {
    labels: [],
    series: [[]]
  },
  options: {
    axisX: {
      showGrid: false
    },
    low: 0,
    high: 100,
    chartPadding: {
      top: 0,
      right: 5,
      bottom: 0,
      left: 0
    }
  },
  responsiveOptions: [
    [
      "screen and (max-width: 640px)",
      {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function(value) {
            return value[0];
          }
        }
      }
    ]
  ],
  animation: {
    draw: function(data) {
      if (data.type === "bar") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: "ease"
          }
        });
      }
    }
  }
};

class Disease extends React.Component {

  state = {
    possibleDiseases: [],
    isResultFilled: false
  };

  isDiseaseFound = () => {
    return this.state.isResultFilled == true;
  }

  resetGraph = () => {

    diseaseChart.data.labels = [];
    diseaseChart.data.series[0] = [];

    this.state.possibleDiseases.forEach(element => {
      diseaseChart.data.labels.push(element.name);
      diseaseChart.data.series[0].push(element.occurancePercentage);
    });
  }

  diseaseTable = () => {
    var diseaseTable = [];
    console.log(this.state.possibleDiseases);

    this.state.possibleDiseases.forEach(element => {
      diseaseTable.push([element.name, parseInt(element.occurancePercentage, 10) + "%"]);
    });

    console.log(diseaseTable);
    this.resetGraph();

    return diseaseTable;
  }

  componentDidMount() {

    var url = new URL("http://ajya-pc04:9000/MedicalRecommendationEngine/rest/symptomsController/disease");
    console.log(this.props.selectedSymptomsList + " vs " + JSON.stringify(this.props.selectedSymptomsList));
    url.searchParams.append("symptoms", this.props.selectedSymptomsList);
    fetch(url)
     .then(result=>result.json())
     .then(item=> {
       this.setState({possibleDiseases: item, isResultFilled: true});
     });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        { this.isDiseaseFound() ? (<Grid container>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Disease Prediction</h4>
                  <p className={classes.cardCategoryWhite}>
                    Based on symptoms you selected.
                  </p>
                </CardHeader>
                <CardBody>
                  <Table
                    tableHeaderColor="warning"
                    tableHead={["Disease Name", "Prediction chances"]}
                    tableData={this.diseaseTable()}
                  />
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <Card chart>
                <CardHeader color="warning">
                  <ChartistGraph
                    className="ct-chart"
                    data={diseaseChart.data}
                    type="Bar"
                    options={diseaseChart.options}
                    responsiveOptions={diseaseChart.responsiveOptions}
                    listener={diseaseChart.animation}
                  />
                </CardHeader>
                <CardBody>
                  <h4 className={classes.cardTitle}>Disease Prediction Chart</h4>
                  
                </CardBody>
                <CardFooter chart>
                </CardFooter>
              </Card>
          </GridItem>
        </Grid>)
        : (
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}> "Analyzing Symptoms..." </h4>
            </CardHeader>
            <CardBody>
              <h2>"Please wait... we are processing your symptoms." </h2>
            </CardBody>
          </Card>
        )}
      </div>
    );
  }
}

Disease.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Disease);
