import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"

import Fade from "@material-ui/core/Fade"

const Header = ({ siteTitle, cbTabChanged, propCurrentTab }) => (
  <header
    style={{
      background: `black`,
      marginBottom: `1.45rem`,
    }}
  >
    <Fade direction="up" in={true} mountOnEnter unmountOnExit>
      <AppBar position="static">
        <Tabs
          value={propCurrentTab}
          onChange={(e, v) => cbTabChanged(e, v)}
          aria-label="simple tabs example"
          centered
        >
          <Tab label="Search" />
          <Tab label="Wishlist" />
          <Tab label="Fetch" />
          <Tab label="Info" />
        </Tabs>
      </AppBar>
    </Fade>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
  //cbTabChanged: PropTypes.Fund ???
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
