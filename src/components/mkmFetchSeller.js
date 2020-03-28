import React from "react"

import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Fade from "@material-ui/core/Fade"
import MenuItem from "@material-ui/core/MenuItem"
import Paper from "@material-ui/core/Paper"

import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"

import IconButton from "@material-ui/core/IconButton"
import DeleteIcon from "@material-ui/icons/Delete"
import SearchIcon from "@material-ui/icons/Search"
import AddIcon from "@material-ui/icons/Add"

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

class MKMFetcherSeller extends React.Component {
  constructor(props) {
    super(props)
    // this.handeEvent = this.handleEvent.bind(this);
    this.fetchSellerCardCount = this.fetchSellerCardCount.bind(this)
    this.addSeller = this.addSeller.bind(this)
    this.deleteSeller = this.deleteSeller.bind(this)
    this.state = {
      stateMounted: false,
      stateCardCount: 100,
      stateSellerList: ["Jinkaz", "baobab"],
    }
  }

  componentDidMount() {
    this.setState({ stateMounted: true })
    /*const d = localStorage.getItem("KDOWishList")
    const w = JSON.parse(d)
    if (d !== null && d !== "") this.setState({ stateWishList: w })*/

    const d = localStorage.getItem("KDOSellerList")
    const w = JSON.parse(d)
    if (d !== null && d !== "") this.setState({ stateSellerList: w })
  }

  componentWillUnmount() {
    //window.removeEventListener("event",this.handleEvent);
  }

  fetchSellerCardCount(idx) {
    const seller = this.state.stateSellerList[idx]
    if (seller === "") return

    fetch("./.netlify/functions/mkmseller?seller=" + seller).then(response =>
      response
        .json()
        .then(json => this.setState({ stateCardCount: json.nbcards }))
    )
  }

  addSeller() {
    let sellers = this.state.stateSellerList
    sellers.unshift(this.refSellerInput.value)
    this.setState({ stateSellerList: sellers })

    this.refSellerInput.value = ""
    localStorage.setItem(
      "KDOSellerList",
      JSON.stringify(this.state.stateSellerList)
    )
  }

  deleteSeller(idx) {
    //console.log(idx)
    let w = this.state.stateSellerList
    w.splice(idx, 1)
    this.setState({ stateSellerList: w })

    localStorage.setItem(
      "KDOSellerList",
      JSON.stringify(this.state.stateSellerList)
    )
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
                inputRef={el => (this.refSellerInput = el)}
              />
              <IconButton
                color="primary"
                aria-label="add seller"
                component="span"
                onClick={() => this.addSeller()}
              >
                <AddIcon />
              </IconButton>
            </div>
          </form>
          <List dense={true} style={classes.cardList}>
            {this.state.stateSellerList.map((e, i) => {
              return (
                <ListItem
                  key={i}
                  button
                  onClick={() => this.fetchSellerCardCount(i)}
                >
                  <ListItemText primary={e} key={i} />
                  <ListItemSecondaryAction key={i}>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      key={i}
                      onClick={() => this.deleteSeller(i)}
                    >
                      <DeleteIcon key={i} />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )
            })}
          </List>
          <Paper>{this.state.stateCardCount}</Paper>
        </div>
      </Fade>
    )
  }
}

export default MKMFetcherSeller
