/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          buildDate
        }
      }
    }
  `)

  return (
    <div
      style={{
        //border: "dashed red",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          //border: "dashed green",
        }}
      >
        <main
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            //border: "dashed orange",
          }}
        >
          {children}
        </main>
        <footer>
          {data.site.siteMetadata.buildDate}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
