import MkmFetcher from "./mkmFetcher"

class MKMFetcherSeller2 extends MkmFetcher {
  constructor(props) {
    super(props)

    this.state.stateDataList = []
    this.localStorage = "seller"
    // console.log("mkmfetcher2")
  }

  fetchData(idx) {
    //console.log("fetch from fetcher2")
    const data = idx //this.state.stateDataList[idx]
    if (data === "") return

    fetch("./.netlify/functions/mkmseller?seller=" + data).then(response =>
      response.json().then(json => {
        this.setState({ stateResult: json.nbcards })
        let d = this.state.stateDataList[data]
        const ts = Date.now()
        const obj = {}
        obj[ts] = json.nbcards
        d = { ...d, ...obj }
        super.AddFetchData(data, d)
      })
    )
  }
}

export default MKMFetcherSeller2
