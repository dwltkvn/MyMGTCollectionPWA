import React from "react"

import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import ButtonGroup from "@material-ui/core/ButtonGroup"
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

class loginComponent extends React.Component {
  constructor(props) {
    super(props)
    // this.handeEvent = this.handleEvent.bind(this);

    this.state = {}
  }

  componentDidMount() {}

  componentWillUnmount() {
    //window.removeEventListener("event",this.handleEvent);
  }

  render() {
    //const {classes} = this.props;
    //const {myState} = this.state;
    const { propMounted, cbLoggin } = this.props
    const classes = styles

    return (
      <Fade direction="up" in={propMounted} mountOnEnter unmountOnExit>
        <div style={classes.mainLayout}>
          <form noValidate autoComplete="off" style={classes.myForm}>
            <div>
              <TextField
                id="standard-basic"
                label="login"
                inputRef={el => (this.refLogginInput = el)}
              />
            </div>
            <div>
              <TextField
                id="standard-basic"
                label="password"
                inputRef={el => (this.refPasswordInput = el)}
              />
            </div>
            <div style={classes.buttons}>
              <ButtonGroup
                color="primary"
                aria-label="outlined primary button group"
              >
                <Button
                  onClick={() =>
                    cbLoggin(
                      this.refLogginInput.value,
                      this.refPasswordInput.value
                    )
                  }
                >
                  Login
                </Button>
              </ButtonGroup>
            </div>
          </form>
        </div>
      </Fade>
    )
  }
}

export default loginComponent

/*
export const query = graphql`
  query {
    allDataJson {
      nodes {
        lists {
          land
        }
      }
    }
  }
`*/
