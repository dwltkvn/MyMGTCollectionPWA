import React from "react"

import Fade from "@material-ui/core/Fade"
import Typography from "@material-ui/core/Typography"
import Breadcrumbs from "@material-ui/core/Breadcrumbs"
import Link from "@material-ui/core/Link"

import Button from "@material-ui/core/Button"
import ButtonGroup from "@material-ui/core/ButtonGroup"

import MKMFetchCards from "../components/mkmFetchCard"
import MKMFetchSeller from "../components/mkmFetchSeller2"

const styles = {}

class MKMFetchComponent extends React.Component {
  constructor(props) {
    super(props)
    // this.handeEvent = this.handleEvent.bind(this);

    this.state = {
      stateMounted: false,
      stateCurrentFetcher: 0,
    }
  }

  componentDidMount() {
    this.setState({ stateMounted: true })
  }

  componentWillUnmount() {
    //window.removeEventListener("event",this.handleEvent);
  }

  render() {
    //const {classes} = this.props;
    //const {myState} = this.state;
    const { propMounted, propUserName } = this.props
    const classes = styles

    return (
      <Fade direction="up" in={propMounted} mountOnEnter unmountOnExit>
        <>
          <ButtonGroup
            color="primary"
            aria-label="outlined primary button group"
          >
            <Button
              variant={this.state.stateCurrentFetcher === 0 ? "contained" : ""}
              onClick={() => this.setState({ stateCurrentFetcher: 0 })}
            >
              Seller
            </Button>
            <Button
              variant={this.state.stateCurrentFetcher === 1 ? "contained" : ""}
              onClick={() => this.setState({ stateCurrentFetcher: 1 })}
            >
              Cards
            </Button>
            <Button>...</Button>
          </ButtonGroup>

          {this.state.stateCurrentFetcher === 0 && (
            <MKMFetchSeller
              propMounted={this.state.stateMounted}
              propUserName={propUserName}
            />
          )}
          {this.state.stateCurrentFetcher === 1 && (
            <MKMFetchCards
              propMounted={this.state.stateMounted}
              propUserName={propUserName}
            />
          )}
        </>
      </Fade>
    )
  }
}

export default MKMFetchComponent
