/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
export const onClientEntry = () => {
  window.global_updateAvailable = false
}

export const onServiceWorkerUpdateFound = ({ serviceWorker }) => {
  window.global_updateAvailable = true
}
