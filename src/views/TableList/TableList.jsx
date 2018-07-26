import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

// core components
import GridItem from "components/Grid/GridItem.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

import Button from "components/CustomButtons/Button.jsx";
import DownshiftMultiple from "components/CustomInput/DownshiftMultiple.jsx";

import Symptoms from "./Symptoms.jsx"
import Disease from "./Disease.jsx"

import CardAvatar from "components/Card/CardAvatar.jsx";

import CardFooter from "components/Card/CardFooter.jsx";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

class TableList extends React.Component {
  state = {
    selectedSymptoms: []
  };


  isSymptomsSelected = () => {
    return this.state.selectedSymptoms.length != 0
  }

  handleSelectedSymptoms = (selectedSymptoms) => {
    this.setState({selectedSymptoms: selectedSymptoms});
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        { this.isSymptomsSelected() ? <Disease selectedSymptomsList={this.state.selectedSymptoms}/> : <Symptoms onChange={this.handleSelectedSymptoms}/> }
      </div>
    );
  }
}

export default withStyles(styles)(TableList);
