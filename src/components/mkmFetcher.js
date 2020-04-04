import React from "react"

import Input from "@material-ui/core/Input"
import TextField from "@material-ui/core/TextField"
import Fade from "@material-ui/core/Fade"
import Paper from "@material-ui/core/Paper"
import InputAdornment from "@material-ui/core/InputAdornment"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"

import IconButton from "@material-ui/core/IconButton"
import DeleteIcon from "@material-ui/icons/Delete"
import AddIcon from "@material-ui/icons/Add"
import HelpOutlineIcon from "@material-ui/icons/HelpOutline"
import GetAppIcon from "@material-ui/icons/GetApp"

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
    this.fetchAllData = this.fetchAllData.bind(this)
    this.fetchData = this.fetchData.bind(this)
    this.addData = this.addData.bind(this)
    this.deleteData = this.deleteData.bind(this)
    this.handleButtonPress = this.handleButtonPress.bind(this)
    this.handleButtonRelease = this.handleButtonRelease.bind(this)
    this.buttonPressTimer = undefined
    this.localStorage = "KDO"
    this.currentFetchIdx = -1
    this.fetchingAllData = false
    this.userName = props.propUserName
    this.state = {
      stateMounted: false,
      stateResult: "1",
      stateDataList: [],
      stateLongPress: 0, // 0:not cliked, 1: pressed, 2: long pressed
    }
    console.log(props.propUserName)
  }

  componentDidMount() {
    this.setState({ stateMounted: true })

    firebase
      .database()
      .ref("/" + this.userName + "/" + this.localStorage + "/")
      .on("value", snapshot => {
        let w = {}
        if (snapshot.val()) {
          const data = snapshot.val()
          w = data
        }
        this.setState({ stateDataList: w })
      })
  }

  componentWillUnmount() {
    //window.removeEventListener("event",this.handleEvent);
    firebase
      .database()
      .ref("/" + this.userName + "/" + this.localStorage + "/")
      .off()
  }

  handleButtonPress(e) {
    this.setState({ stateLongPress: 1 })
    this.buttonPressTimer = setTimeout(() => {
      this.setState({ stateLongPress: 2 })
      this.longPress(e)
    }, 1500)
  }

  handleButtonRelease(e) {
    //const longPress = this.state.stateLongPress === 1
    clearTimeout(this.buttonPressTimer)
    this.buttonPressTimer = undefined
    this.setState({ stateLongPress: 0 })
    //if (longPress) this.fetchData(e)
  }

  longPress(data) {}

  fetchAllData() {
    if (this.fetchingAllData) {
      const keys = Object.keys(this.state.stateDataList)
      this.currentFetchIdx++
      if (this.currentFetchIdx < keys.length)
        this.fetchData(keys[this.currentFetchIdx])
      else {
        this.currentFetchIdx = -1
        this.fetchingAllData = false
      }
    }
  }

  fetchData(idx) {}

  addData() {
    const ts = Date.now()
    firebase
      .database()
      .ref(
        "/" +
          this.userName +
          "/" +
          this.localStorage +
          "/" +
          this.refInput.value
      )
      .set({
        0: 0,
      })
    this.refInput.value = ""
  }

  AddFetchData(seller, data) {
    firebase
      .database()
      .ref("/" + this.userName + "/" + this.localStorage + "/" + seller)
      .set(data)
  }

  deleteData(idx) {
    firebase
      .database()
      .ref("/" + this.userName + "/" + this.localStorage + "/" + idx)
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
              <Input
                id="standard-basic"
                label="Input2"
                inputRef={el => (this.refInput = el)}
                endAdornment={
                  <InputAdornment position="end">
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
                      onClick={() => {
                        this.fetchingAllData = false
                        this.fetchData()
                      }}
                    >
                      <HelpOutlineIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      aria-label="add data"
                      component="span"
                      onClick={() => {
                        this.fetchingAllData = true
                        this.fetchAllData()
                      }}
                    >
                      <GetAppIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </div>
          </form>
          <List dense={true} style={classes.cardList}>
            {Object.keys(this.state.stateDataList).map((e, i) => {
              const list = Object.values(this.state.stateDataList[e])
              const keys = Object.keys(this.state.stateDataList[e])
              const lastDate = keys[keys.length - 1]
              const nowDate = Date.now()
              const diffTime = Math.abs(nowDate - lastDate)
              const diffDays = diffTime / (1000 * 60 * 60 * 24)
              //console.log(diffDays + " " + e)
              let secondaryTxt = list.slice(-5).join(",")
              if (diffDays <= 0.5)
                secondaryTxt = <b>{list.slice(-5).join(",")}</b>

              return (
                <ListItem
                  key={i}
                  button
                  onClick={() => {
                    this.fetchingAllData = false
                    this.fetchData(e)
                  }}
                  onMouseDown={() => this.handleButtonPress(e)}
                  onMouseUp={() => this.handleButtonRelease(e)}
                  onMouseLeave={() => this.handleButtonRelease(e)}
                  onTouchStart={() => this.handleButtonPress(e)}
                  onTouchEnd={() => this.handleButtonRelease(e)}
                >
                  <ListItemText primary={e} secondary={secondaryTxt} key={i} />
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
