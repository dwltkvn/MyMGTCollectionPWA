import React from "react"

import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Fade from "@material-ui/core/Fade"

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
    this.fetchSellerCardCount = this.fetchSellerCardCount.bind(this)
    this.state = {
      stateMounted: false,
    }
  }

  componentDidMount() {
    this.setState({ stateMounted: true })
    /*const d = localStorage.getItem("KDOWishList")
    const w = JSON.parse(d)
    if (d !== null && d !== "") this.setState({ stateWishList: w })*/
  }

  componentWillUnmount() {
    //window.removeEventListener("event",this.handleEvent);
  }

  fetchSellerCardCount() {}
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
                label="Seller Name"
                inputRef={el => (this.refUserInput = el)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.fetchSellerCardCount()}
              >
                Card Count
              </Button>
            </div>
          </form>
        </div>
      </Fade>
    )
  }
}

export default MKMFetcher
