import React from "react"

import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Slide from "@material-ui/core/Slide"
import Fade from "@material-ui/core/Fade"
import IconButton from "@material-ui/core/IconButton"
import ClearIcon from "@material-ui/icons/Clear"

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
    this.addToWishList = this.addToWishList.bind(this)
    this.state = {
      stateSearchResult: [],
      stateMounted: false,
      stateSearching: 0, // 0:initial, 1:found, 2: searching, 3:not found
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

    this.setState({ stateSearching: 2 })
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
    let stateSearching = 1
    if (result.length === 0) {
      stateSearching = 3
    } // not found
    this.setState({ stateSearching })
  }

  searchCard(data) {
    const v = this.refUserInput.value

    let searchList = v.split("\n")
    searchList = searchList.map(card => card.toLowerCase())

    this.setState({ stateSearching: 2 })
    let result = []
    //console.log(v)
    const keys = Object.keys(data.allDataJson.nodes[0].lists)
    //console.log(keys)
    keys.forEach(key => {
      data.allDataJson.nodes[0].lists[key].forEach(card => {
        //if (card.toLowerCase() === v.toLowerCase()) {
        if (searchList.includes(card.toLowerCase())) {
          //console.log(key + " " + card)
          let r = { cardname: card, listname: key }
          result.push(r)
        }
      })
    })
    this.setState({ stateSearchResult: result })
    let stateSearching = 1
    if (result.length === 0) {
      stateSearching = 3
    } // not found
    this.setState({ stateSearching })
  }

  addToWishList() {
    const v = this.refUserInput.value

    const d = localStorage.getItem("KDOWishList")
    let w = JSON.parse(d)
    if (d === null || d === "") w = []

    w.unshift(v)

    this.refUserInput.value = ""
    localStorage.setItem("KDOWishList", JSON.stringify(w))
    this.setState({ stateSearching: 0 }) // restore the search state
  }

  render() {
    //const {classes} = this.props;
    //const {myState} = this.state;
    const { propMounted, data, cbGoToWishList } = this.props
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
                multiline
                rowsMax={2}
              />

              <IconButton
                color="primary"
                aria-label="add seller"
                component="span"
                onClick={() => (this.refUserInput.value = "")}
              >
                <ClearIcon />
              </IconButton>
            </div>
            <div style={classes.buttons}>
              <ButtonGroup
                color="primary"
                aria-label="outlined primary button group"
              >
                <Button onClick={() => this.searchCard(data)}>Search</Button>
                <Button onClick={() => this.containsText(data)}>
                  Contains
                </Button>
              </ButtonGroup>
            </div>
          </form>

          <List dense={true} style={classes.cardList}>
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

          {this.state.stateSearching === 3 && (
            <Button
              variant="outlined"
              onClick={() => cbGoToWishList(this.refUserInput.value)}
            >
              Add to Wishlist
            </Button>
          )}
          {this.state.stateSearching === 2 && <b>Searching...</b>}
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
