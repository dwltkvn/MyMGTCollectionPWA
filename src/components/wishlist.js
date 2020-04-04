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

class WishList extends React.Component {
  constructor(props) {
    super(props)
    // this.handeEvent = this.handleEvent.bind(this);
    this.addToWishList = this.addToWishList.bind(this)
    this.deteteFromWishList = this.deteteFromWishList.bind(this)
    this.userName = props.propUserName
    this.state = {
      stateMounted: false,
      stateWishList: [],
      stateDefaultCardName: props.propDefaultCardName,
    }
  }

  componentDidMount() {
    this.setState({ stateMounted: true })
    /*const d = localStorage.getItem("KDOWishList")
    const w = JSON.parse(d)
    if (d !== null && d !== "") this.setState({ stateWishList: w })*/

    firebase
      .database()
      .ref(this.userName + "/wishlist/")
      .on("value", snapshot => {
        let w = []
        if (snapshot.val()) {
          const data = snapshot.val()
          const keys = Object.keys(data)
          keys.forEach(key => {
            const obj = data[key]
            const obj2 = { ...obj, id: key }
            w.unshift(obj2)
            //console.log(obj2)
          })
        }
        this.setState({ stateWishList: w })
      })

    // transfer
    /*firebase
      .database()
      .ref("/wishlist/")
      .once("value", snapshot => {
        if (snapshot.val()) {
          console.log(snapshot.val())
          firebase
            .database()
            .ref(this.userName)
            .set({
              wishlist: snapshot.val(),
            })
        }
      })*/
  }

  componentWillUnmount() {
    //window.removeEventListener("event",this.handleEvent);
    firebase
      .database()
      .ref(this.userName + "/wishlist/")
      .off()
  }

  addToWishList() {
    const ts = Date.now()
    //console.log("test fb")
    firebase
      .database()
      .ref(this.userName + "/wishlist/" + ts)
      .set({
        name: this.refUserInput.value,
        comment: "",
      })

    this.refUserInput.value = ""
  }

  deteteFromWishList(id) {
    firebase
      .database()
      .ref(this.userName + "/wishlist/" + id)
      .set({})
  }

  render() {
    //const {classes} = this.props;
    //const {myState} = this.state;
    const { propMounted, propDefaultCardName, propUserName } = this.props
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
                value={
                  this.state.stateDefaultCardName.length > 0
                    ? this.state.stateDefaultCardName
                    : undefined
                }
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
                <ListItem key={e.id}>
                  <ListItemText
                    primary={e.name}
                    secondary={e.comment}
                    key={e.id}
                  />
                  <ListItemSecondaryAction key={e.id}>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      key={e.id}
                      onClick={() => this.deteteFromWishList(e.id)}
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
