import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { useStaticQuery, graphql } from "gatsby"

import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Slide from "@material-ui/core/Slide"
import Fade from "@material-ui/core/Fade"

import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart"

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

class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    // this.handeEvent = this.handleEvent.bind(this);
    this.searchCard = this.searchCard.bind(this)
    this.containsText = this.containsText.bind(this)
    this.handleBeforeInstallPrompt = this.handleBeforeInstallPrompt.bind(this)
    this.handleAppInstallation = this.handleAppInstallation.bind(this)
    this.data = props.data
    this.deferredPrompt = null
    this.state = {
      stateSearchResult: [],
      stateMounted: false,
      stateDisplayInstallBtn: false,
    }
  }

  componentDidMount() {
    this.setState({ stateMounted: true })
    window.addEventListener(
      "beforeinstallprompt",
      this.handleBeforeInstallPrompt
    )
  }

  componentWillUnmount() {
    //window.removeEventListener("event",this.handleEvent);
    window.removeEventListener(
      "beforeinstallprompt",
      this.handleBeforeInstallPrompt
    )
  }

  handleBeforeInstallPrompt(e) {
    e.preventDefault()
    this.deferredPrompt = e
    this.setState({ stateDisplayInstallBtn: true })
  }

  handleAppInstallation() {
    this.deferredPrompt.prompt()
    this.deferredPrompt.userChoice.then(choiceResult => {
      if (choiceResult.outcome === "accepted") {
        this.setState({ stateDisplayInstallBtn: false })
      }
      this.deferredPrompt = null
    })
  }

  containsText() {
    const v = this.refUserInput.value
    if (v === "") return
    if (v.length < 3) return

    let result = []
    //console.log(v)
    const keys = Object.keys(this.data.allDataJson.nodes[0].lists)
    //console.log(keys)
    keys.forEach(key => {
      this.data.allDataJson.nodes[0].lists[key].forEach(card => {
        if (card.toLowerCase().includes(v.toLowerCase())) {
          //console.log(key + " " + card)
          let r = { cardname: card, listname: key }
          result.push(r)
        }
      })
    })
    this.setState({ stateSearchResult: result })
  }

  searchCard() {
    const v = this.refUserInput.value
    let result = []
    //console.log(v)
    const keys = Object.keys(this.data.allDataJson.nodes[0].lists)
    //console.log(keys)
    keys.forEach(key => {
      this.data.allDataJson.nodes[0].lists[key].forEach(card => {
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
    //const { classes } = this.props
    const classes = styles

    return (
      <Layout>
        <SEO title="Home" />
        <Fade
          direction="up"
          in={this.state.stateMounted}
          mountOnEnter
          unmountOnExit
        >
          <div style={classes.mainLayout}>
            <form noValidate autoComplete="off" style={classes.myForm}>
              <div>
                <TextField
                  id="standard-basic"
                  label="Card Name"
                  inputRef={el => (this.refUserInput = el)}
                />
                {this.state.stateDisplayInstallBtn ? (
                  <IconButton
                    color="primary"
                    aria-label="install"
                    onClick={() => this.handleAppInstallation()}
                  >
                    <AddShoppingCartIcon />
                  </IconButton>
                ) : null}
              </div>
              <div style={classes.buttons}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => this.searchCard()}
                >
                  Search
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => this.containsText()}
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
                  <ListItem key={i}>
                    <ListItemText
                      key={i}
                      primary={e.cardname}
                      secondary={e.listname}
                    />
                  </ListItem>
                )
              })}
            </List>
          </div>
        </Fade>
      </Layout>
    )
  }
}

export default IndexPage

export const query = graphql`
  query {
    allDataJson {
      totalCount
      nodes {
        lists {
          UncoCommon
          Rares
          Lands
          Zendikar
          Worldwake
          WaroftheSpark
          Torment
          Theros
          ShardofAlara
          Shadowmoor
          Scrouge
          ScarsofMirrodin
          Planeshift
          Onslaught
          Odyssey
          NewPhyrexia
          Nemesis
          MirrodinBesiged
          Mirrodin
          MercadianMasques
          Judgement
          Invasion
          Innistrad
          GuildsofRavnica
          Eventide
          Darksteel
          Conflux
          Commander2018
          Apocalypse
          Lorwyn
          Legions
          DarkAscension
          Scanning
          AchatCardMarket1
          Urza
          CoreSet
          OldiesSet
          RavnicaAllegiances
          PlanarChaos
          Morningtide
          AchatLesContreesDuJeu1
          AchatLesContreesDuJeu2
          AchatCardMarket3
          AchatCardMarket4
          AchatLesContreesDuJeu3
          AchatCardMarket5
          AchatOversizedCommander2013
          AchatOversizedCommander2014
          AchatLaCommunauteeDuJeu1
          Commander2019Faceless
          Commander2019Mystik
          Commander2019Merciless
          AchatCardMarket6
          AchatCadeauAndy1Morph
          Gatecrash
          Guildpact
          JourneyintoNix
          Profecy
          RavnicaCityofGuilds
          RaresWhite
          RaresBlue
          RaresBlack
          RaresRed
          RaresGreen
          RaresColorless
          RaresMulti
          AchatCardMarket7
          ThroneofEldraine
          AchatLesContreesDuJeu4
          AchatLesContreesDuJeu5
          AchatCardMarket9
          AchatMagicBazarBoosters
          AchatBrawlWildBounty
          AchatBrawlFaerieSchemes
          AchatCadeauAndyBattleForZendikar
          AchatCardMarket10
          AchatCardMarket11
          AchatCardMarket12
          AchatCardMarket13
          AchatCardMarket14
          Battlebond
          BattleForZendikar
          AchatCardMarket15
          AchatCardMarket16
          AchatCardMarket17
          AchatCardMarket18
          AchatCardMarket19
          AchatCardMarket20
          AchatCardMarket21
          AchatCadeauCec1Noel2019
          AchatCadeauAndy2Noel2019
          Scanning2
          AchatCardMarket22
          AchatCardMarket23
          TherosBeyondDeath
          AchatCardMarket24
          AchatCardMarket25
          AchatCardMarket26
          AchatCardMarket27
          AchatCardMarket28
          AchatCardMarket29
          AchatCardMarket30
          AchatCardMarket31
          AchatCardMarket32
          AchatCardMarket33
          AchatCadeauCec2Anniv2020
          AchatCardMarket34
          AchatCardMarket35
          AchatCardMarket36
          AchatCardMarket37
          AchatCadeauAndy3Anniv2020
        }
      }
    }
  }
`

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
