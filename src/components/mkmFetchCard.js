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

  addData() {
    let data = this.state.stateDataList
    let input = this.refInput.value
    input = input
      .replace(/ /g, "-")
      .replace(/'/g, "")
      .replace(/,/g, "")

    data.unshift(input)
    this.setState({ stateDataList: data })

    this.refInput.value = ""
  }
}

export default MKMFetcherCard
