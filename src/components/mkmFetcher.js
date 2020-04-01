import React from "react"

import TextField from "@material-ui/core/TextField"
import Fade from "@material-ui/core/Fade"
import Paper from "@material-ui/core/Paper"

import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"

import IconButton from "@material-ui/core/IconButton"
import DeleteIcon from "@material-ui/icons/Delete"
import AddIcon from "@material-ui/icons/Add"
import HelpOutlineIcon from "@material-ui/icons/HelpOutline"

import firebase from "../components/firebase"

const styles = {
  mainLayout: {
    //height: "1vh",
    //border: "dashed red",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    minHeight: "0",
    height: "0",
  },
  cardList: {
    //flex: "1 1 auto",
    overflow: "auto",
    //"min-height": "0",
    //border: "solid blue",
    //height: "300px",
  },
  myForm: {
    //height: "1vh",
    //border: "dashed blue",
    //flex: 0,
  },
  buttons: {
    padding: "1.0875rem 1.0875rem 1.0875rem 1.0875rem",
  },
}

class MKMFetcher extends React.Component {
  constructor(props) {
    super(props)
    // this.handeEvent = this.handleEvent.bind(this);
    this.fetchData = this.fetchData.bind(this)
    this.addData = this.addData.bind(this)
    this.deleteData = this.deleteData.bind(this)
    this.handleButtonPress = this.handleButtonPress.bind(this)
    this.handleButtonRelease = this.handleButtonRelease.bind(this)
    this.buttonPressTimer = undefined
    this.localStorage = "KDO"
    this.state = {
      stateMounted: false,
      stateResult: "1",
      stateDataList: [],
      stateLongPress: 0, // 0:not cliked, 1: pressed, 2: long pressed
    }
  }

  componentDidMount() {
    this.setState({ stateMounted: true })

    /*const d = localStorage.getItem(this.localStorage)
    const w = JSON.parse(d)
    if (d !== null && d !== "") this.setState({ stateDataList: w })*/

    firebase
      .database()
      .ref("/" + this.localStorage + "/")
      .on("value", snapshot => {
        let w = {}
        const data = snapshot.val()
        w = data
        /*const keys = Object.keys(
          data
        ) 
        keys.forEach(key => {
          let obj = {}
          //obj[key] = data[key]
          //const obj2 = { ...obj, id: key }
          //w.unshift(obj)
          //w = { ...w, obj }
          w[key] = data[key]
          //console.log(obj2)
        })*/
        this.setState({ stateDataList: w })
      })
  }

  componentWillUnmount() {
    //window.removeEventListener("event",this.handleEvent);
  }

  handleButtonPress(e) {
    this.setState({ stateLongPress: 1 })
    this.buttonPressTimer = setTimeout(() => {
      this.setState({ stateLongPress: 2 })
      this.longPress(e)
    }, 1500)
  }

  handleButtonRelease(e) {
    const longPress = this.state.stateLongPress === 1
    clearTimeout(this.buttonPressTimer)
    this.buttonPressTimer = undefined
    this.setState({ stateLongPress: 0 })
    if (longPress) this.fetchData(e)
  }

  longPress(data) {}

  fetchData(idx) {}

  addData() {
    /*let data = this.state.stateDataList
    data.unshift(this.refInput.value)
    this.setState({ stateDataList: data })

    this.refInput.value = ""
    localStorage.setItem(
      this.localStorage,
      JSON.stringify(this.state.stateDataList)
    )*/
    const ts = Date.now()
    firebase
      .database()
      .ref("/" + this.localStorage + "/" + this.refInput.value)
      .set({
        0: 0,
      })
    this.refInput.value = ""
  }

  AddFetchData(seller, data) {
    firebase
      .database()
      .ref("/" + this.localStorage + "/" + seller)
      .set(data)
  }
  deleteData(idx) {
    //console.log(idx)
    /*let w = this.state.stateDataList
    w.splice(idx, 1)
    this.setState({ stateSellerList: w })

    localStorage.setItem(
      this.localStorage,
      JSON.stringify(this.state.stateDataList)
    )*/
    firebase
      .database()
      .ref("/" + this.localStorage + "/" + idx)
      .set({})
  }

  render() {
    //const {classes} = this.props;
    //const {myState} = this.state;
    const { propMounted } = this.props
    const classes = styles

    return (
      <Fade direction="up" in={propMounted} mountOnEnter unmountOnExit>
        <div style={classes.mainLayout}>
          <form noValidate autoComplete="off" style={classes.myForm}>
            <div>
              <TextField
                id="standard-basic"
                label="Input"
                inputRef={el => (this.refInput = el)}
              />
              <IconButton
                color="primary"
                aria-label="add data"
                component="span"
                onClick={() => this.addData()}
              >
                <AddIcon />
              </IconButton>
              <IconButton
                color="primary"
                aria-label="add data"
                component="span"
                onClick={() => this.fetchData()}
              >
                <HelpOutlineIcon />
              </IconButton>
            </div>
          </form>
          <List dense={true} style={classes.cardList}>
            {Object.keys(this.state.stateDataList).map((e, i) => {
              return (
                <ListItem
                  key={i}
                  button
                  /*onClick={() => this.fetchData(e)}*/
                  onMouseDown={() => this.handleButtonPress(e)}
                  onMouseUp={() => this.handleButtonRelease(e)}
                  onMouseLeave={() => this.handleButtonRelease(e)}
                  onTouchStart={() => this.handleButtonPress(e)}
                  onTouchEnd={() => this.handleButtonRelease(e)}
                >
                  <ListItemText
                    primary={e}
                    secondary={Object.values(this.state.stateDataList[e])
                      .slice(-5)
                      .join(",")}
                    key={i}
                  />
                  <ListItemSecondaryAction key={i}>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      key={i}
                      onClick={() => this.deleteData(e)}
                    >
                      <DeleteIcon key={i} />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )
            })}
          </List>
          <Paper>{this.state.stateResult}</Paper>
        </div>
      </Fade>
    )
  }
}

export default MKMFetcher
