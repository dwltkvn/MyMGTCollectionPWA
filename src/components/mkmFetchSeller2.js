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
    let data = idx //this.state.stateDataList[idx]
    if (data === "" || data === undefined) data = this.refInput.value
    console.log(data)
    /*
    let d = this.state.stateDataList[data]
    const keys = Object.keys(d)
    const lastKey = keys[keys.length - 1]
    return
    */

    fetch("./.netlify/functions/mkmseller?seller=" + data).then(response =>
      response.json().then(json => {
        this.setState({ stateResult: json.nbcards })
        let d = this.state.stateDataList[data]
        const ts = Date.now()
        const obj = {}
        obj[ts] = json.nbcards

        const keys = Object.keys(d)
        const lastKey = keys[keys.length - 1]

        if (d[lastKey] !== json.nbcards) {
          d = { ...d, ...obj }
          super.AddFetchData(data, d)
        }
      })
    )
  }
}

export default MKMFetcherSeller2
