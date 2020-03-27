import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"

const Header = ({ siteTitle, cbTabChanged, propCurrentTab }) => (
  <header
    style={{
      background: `black`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
    <AppBar position="static">
      <Tabs
        value={propCurrentTab}
        onChange={(e, v) => cbTabChanged(e, v)}
        aria-label="simple tabs example"
        centered
      >
        <Tab label="Search" />
        <Tab label="Wishlist" />
        <Tab label="Info" />
      </Tabs>
    </AppBar>
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
