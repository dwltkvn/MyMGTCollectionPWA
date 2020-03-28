import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Snackbar from "@material-ui/core/Snackbar"

import IconButton from "@material-ui/core/IconButton"
import AddIcon from "@material-ui/icons/Add"

import CollectionSearch from "../components/collectionSearch"
import WishList from "../components/wishlist"
import MkmFetcher from "../components/mkmFetchComponent"

class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    // this.handeEvent = this.handleEvent.bind(this);
    this.handleBeforeInstallPrompt = this.handleBeforeInstallPrompt.bind(this)
    this.handleAppInstallation = this.handleAppInstallation.bind(this)
    this.checkForUpdate = this.checkForUpdate.bind(this)
    this.data = props.data
    this.deferredPrompt = null
    this.state = {
      stateMounted: false,
      stateDisplayInstallBtn: false,
      stateUpdateAvailable: false,
      stateCurrentPage: 0,
    }
  }

  componentDidMount() {
    this.setState({ stateMounted: true })
    window.addEventListener(
      "beforeinstallprompt",
      this.handleBeforeInstallPrompt
    )
    this.checkForUpdate()
    console.log(this.data.allDataJson.nodes[0].lists.Lands[0])
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
      /*if (choiceResult.outcome === "accepted") {
        
      }*/
      this.setState({ stateDisplayInstallBtn: false })
      this.deferredPrompt = null
    })
  }

  checkForUpdate() {
    //console.log("check for update")
    const stateUpdateAvailable = window.global_updateAvailable
    this.setState({ stateUpdateAvailable })
    if (!stateUpdateAvailable) setTimeout(this.checkForUpdate, 1000)
  }

  render() {
    //const {classes} = this.props;
    //const {myState} = this.state;
    //const { classes } = this.props

    return (
      <Layout cbPageChanged={v => this.setState({ stateCurrentPage: v })}>
        <SEO title="Search" />

        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={this.state.stateUpdateAvailable}
          autoHideDuration={6000}
          onClose={() => this.setState({ stateUpdateAvailable: false })}
          message="Update Available: Plz reload"
        />

        {this.state.stateCurrentPage === 0 && (
          <CollectionSearch
            propMounted={this.state.stateMounted}
            data={this.data}
          />
        )}
        {this.state.stateCurrentPage === 1 && (
          <WishList propMounted={this.state.stateMounted} />
        )}
        {this.state.stateCurrentPage === 2 && (
          <MkmFetcher propMounted={this.state.stateMounted} />
        )}
        {this.state.stateDisplayInstallBtn ? (
          <IconButton
            color="primary"
            aria-label="install"
            onClick={() => this.handleAppInstallation()}
          >
            <AddIcon />
          </IconButton>
        ) : null}
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
