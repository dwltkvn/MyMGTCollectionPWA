import MkmFetcher from "./mkmFetcher"

class MKMFetcherCard extends MkmFetcher {
  constructor(props) {
    super(props)

    this.state.stateDataList = ["Muldrotha, the Gravetide", "Sulfur Falls"]

    // console.log("mkmfetcher2")
  }

  fetchData(idx) {
    //console.log("fetch from fetcher2")
    const data = this.state.stateDataList[idx]
    if (data === "") return

    fetch("./.netlify/functions/mkmcards?lang=en&card=" + data).then(response =>
      response
        .json()
        .then(json =>
          this.setState({ stateResult: json.seller + " : " + json.price })
        )
    )
  }
}

export default MKMFetcherCard
