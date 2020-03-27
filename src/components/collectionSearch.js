import React from "react"

import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Slide from "@material-ui/core/Slide"
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

class collectionSearch extends React.Component {
  constructor(props) {
    super(props)
    // this.handeEvent = this.handleEvent.bind(this);
    this.searchCard = this.searchCard.bind(this)
    this.containsText = this.containsText.bind(this)
    this.state = {
      stateSearchResult: [],
      stateMounted: false,
    }
  }

  componentDidMount() {
    this.setState({ stateMounted: true })
  }

  componentWillUnmount() {
    //window.removeEventListener("event",this.handleEvent);
  }

  containsText(data) {
    const v = this.refUserInput.value
    if (v === "") return
    if (v.length < 3) return

    let result = []
    //console.log(v)
    const keys = Object.keys(data.allDataJson.nodes[0].lists)
    //console.log(keys)
    keys.forEach(key => {
      data.allDataJson.nodes[0].lists[key].forEach(card => {
        if (card.toLowerCase().includes(v.toLowerCase())) {
          //console.log(key + " " + card)
          let r = { cardname: card, listname: key }
          result.push(r)
        }
      })
    })
    this.setState({ stateSearchResult: result })
  }

  searchCard(data) {
    const v = this.refUserInput.value
    let result = []
    //console.log(v)
    const keys = Object.keys(data.allDataJson.nodes[0].lists)
    //console.log(keys)
    keys.forEach(key => {
      data.allDataJson.nodes[0].lists[key].forEach(card => {
        if (card.toLowerCase() === v.toLowerCase()) {
          //console.log(key + " " + card)
          let r = { cardname: card, listname: key }
          result.push(r)
        }
      })
    })
    this.setState({ stateSearchResult: result })
  }

  render() {
    //const {classes} = this.props;
    //const {myState} = this.state;
    const { propMounted, data } = this.props
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
            </div>
            <div style={classes.buttons}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.searchCard(data)}
              >
                Search
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => this.containsText(data)}
              >
                Contains
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  this.refUserInput.value = ""
                  this.setState({ stateSearchResult: [] })
                }}
              >
                Clear
              </Button>
            </div>
          </form>

          <List style={classes.cardList}>
            {this.state.stateSearchResult.map((e, i) => {
              return (
                <Slide
                  direction="up"
                  in={true}
                  mountOnEnter
                  unmountOnExit
                  key={i}
                >
                  <ListItem key={i}>
                    <ListItemText
                      key={i}
                      primary={e.cardname}
                      secondary={e.listname}
                    />
                  </ListItem>
                </Slide>
              )
            })}
          </List>
        </div>
      </Fade>
    )
  }
}

export default collectionSearch

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
