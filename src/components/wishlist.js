import React from "react"

import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import Slide from "@material-ui/core/Slide"
import Fade from "@material-ui/core/Fade"

import AddIcon from "@material-ui/icons/Add"
import DeleteIcon from "@material-ui/icons/Delete"
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

class WishList extends React.Component {
  constructor(props) {
    super(props)
    // this.handeEvent = this.handleEvent.bind(this);
    this.addToWishList = this.addToWishList.bind(this)
    this.deteteFromWishList = this.deteteFromWishList.bind(this)
    this.state = {
      stateMounted: false,
      stateWishList: [],
    }
  }

  componentDidMount() {
    this.setState({ stateMounted: true })
    const d = localStorage.getItem("KDOWishList")
    const w = JSON.parse(d)
    if (d !== null && d !== "") this.setState({ stateWishList: w })
  }

  componentWillUnmount() {
    //window.removeEventListener("event",this.handleEvent);
  }

  addToWishList() {
    const v = this.refUserInput.value

    let w = this.state.stateWishList
    w.unshift(v)
    this.setState({ stateWishList: w })

    this.refUserInput.value = ""
    localStorage.setItem(
      "KDOWishList",
      JSON.stringify(this.state.stateWishList)
    )
  }

  deteteFromWishList(idx) {
    //console.log(idx)
    let w = this.state.stateWishList
    w.splice(idx, 1)
    this.setState({ stateWishList: w })
    localStorage.setItem(
      "KDOWishList",
      JSON.stringify(this.state.stateWishList)
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
                label="Card Name"
                inputRef={el => (this.refUserInput = el)}
              />
              <IconButton
                color="primary"
                aria-label="add to wishlist"
                component="span"
                onClick={() => this.addToWishList()}
              >
                <AddIcon />
              </IconButton>
            </div>
          </form>
          <List dense={true} style={classes.cardList}>
            {this.state.stateWishList.map((e, i) => {
              return (
                <ListItem key={i}>
                  <ListItemText primary={e} key={i} />
                  <ListItemSecondaryAction key={i}>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      key={i}
                      onClick={() => this.deteteFromWishList(i)}
                    >
                      <DeleteIcon key={i} />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )
            })}
          </List>
        </div>
      </Fade>
    )
  }
}

export default WishList
