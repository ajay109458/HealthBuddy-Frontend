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

class Details extends React.Component {
  state = {
    element: null
  };

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

  getSplitedMessages = (message) => {
    var result = []
    if(!!message) {
      var splitStrings =  message.split(".");

      splitStrings.forEach(element => {
          element = element.replace(/[\r\n]/g, "").trim();
          if(!!element) {
            result.push([element]);
          }
      });
    }
    console.log(result);
    return result;
  }

  render() {
    const { classes } = this.props;

    return (

      <div>
        {this.props.element != null ?
          (<div>
            <Grid>
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>{this.props.element.name}</h4>
                    <p className={classes.cardCategoryWhite}>
                      Observed Value :  {this.props.element.observedValue} {this.props.element.unit}
                    </p>
                  </CardHeader>
                  <CardBody>
                    <h4 className={classes.cardTitle}>Risk Factor </h4>
                    <p className={classes.cardCategory}>
                       {parseInt(Math.abs(this.props.element.dangerPercentage))}% ( {this.calculateRiskFactor(this.props.element.dangerPercentage)} )
                    </p>
                    <br/>
                    <h4 className={classes.cardTitle}>Amount</h4>
                    <p className={classes.cardCategory}>
                        {(this.props.element.dangerPercentage < 0) ? "DEFICIENT" : "ABUNDANT"}
                    </p>
                    <br/>
                    <h4 className={classes.cardTitle}>Expected Values</h4>
                    <p className={classes.cardCategory}>
                       {this.props.element.minValue} {this.props.element.unit} - {this.props.element.maxValue} {this.props.element.unit}
                    </p>
                  </CardBody>
                </Card>
              </GridItem>

              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardHeader color="info">
                    <h4 className={classes.cardTitleWhite}>Description</h4>
                  </CardHeader>
                  <CardBody>
                    <p className={classes.cardCategory}>
                      {this.props.element.suggestion.description}
                    </p>
                  </CardBody>
                </Card>
              </GridItem>

              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardHeader color="warning">
                    <h4 className={classes.cardTitleWhite}>Risk</h4>
                  </CardHeader>
                  <CardBody>
                    <Table
                        tableHeaderColor="warning"
                        tableData={this.getSplitedMessages(this.props.element.dangerPercentage < 0 ? this.props.element.suggestion.lowResult : this.props.element.suggestion.highResult)}
                      />
                  </CardBody>
                </Card>
              </GridItem>

              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardHeader color="success">
                    <h4 className={classes.cardTitleWhite}>Suggestion</h4>
                  </CardHeader>
                  <CardBody>
                   <Table
                        tableHeaderColor="warning"
                        tableData={this.getSplitedMessages(this.props.element.dangerPercentage < 0 ? this.props.element.suggestion.lowSuggestion : this.props.element.suggestion.highSuggestion)}
                      />
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <Grid xs={12} sm={12} md={11}>
                  </Grid>
                  <Grid xs={12} sm={12} md={1}>
                    <Button onClick={this.props.onBack} lableStyle={{float: 'right'}} color="primary">Back</Button>
                  </Grid>
              </GridItem>
            </Grid>

          </div>) :
          (<div></div>)}
      </div>

    );
  }
}

Details.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Details);
