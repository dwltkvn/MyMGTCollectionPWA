import MkmFetcher from "./mkmFetcher"

class MKMFetcherSeller2 extends MkmFetcher {
  constructor(props) {
    super(props)

    this.state.stateDataList = []
    this.localStorage = "KDOSellerFetchList"
    // console.log("mkmfetcher2")
  }

  fetchData(idx) {
    //console.log("fetch from fetcher2")
    const data = this.state.stateDataList[idx]
    if (data === "") return

    fetch("./.netlify/functions/mkmseller?seller=" + data).then(response =>
      response.json().then(json => this.setState({ stateResult: json.nbcards }))
    )
  }
}

export default MKMFetcherSeller2
