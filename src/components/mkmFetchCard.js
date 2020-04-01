import MkmFetcher from "./mkmFetcher"

class MKMFetcherCard extends MkmFetcher {
  constructor(props) {
    super(props)

    this.state.stateDataList = []
    this.localStorage = "cards"
    // console.log("mkmfetcher2")
  }

  longPress(data) {
    window.open("https://www.cardmarket.com/en/Magic/Cards/" + data, "_blank")
  }

  fetchData(idx) {
    super.fetchData(idx)
    //console.log("fetch from fetcher2")
    let data = idx //this.state.stateDataList[idx]
    if (data === "" || data === undefined) {
      data = this.refInput.value
      data = data
        .replace(/ /g, "-")
        .replace(/'/g, "")
        .replace(/,/g, "")
    }

    fetch("./.netlify/functions/mkmcards?lang=en&card=" + data).then(response =>
      response.json().then(json => {
        this.setState({
          stateResult: json.seller + " : " + json.price,
          stateFetchRunning: false,
        })
        let d = this.state.stateDataList[data]
        const ts = Date.now()
        const obj = {}
        obj[ts] = json.price

        const keys = Object.keys(d)
        const lastKey = keys[keys.length - 1]

        if (d[lastKey] !== json.price) {
          d = { ...d, ...obj }
          super.AddFetchData(data, d)
        }
        this.fetchAllData()
      })
    )
  }

  addData() {
    let data = this.state.stateDataList
    let input = this.refInput.value
    input = input
      .replace(/ /g, "-")
      .replace(/'/g, "")
      .replace(/,/g, "")

    this.refInput.value = input
    super.addData()
    /*data.unshift(input)
    this.setState({ stateDataList: data })

    this.refInput.value = ""

    localStorage.setItem(
      this.localStorage,
      JSON.stringify(this.state.stateDataList)
    )*/
  }
}

export default MKMFetcherCard
