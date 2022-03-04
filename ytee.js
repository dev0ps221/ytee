const { Ear } = require('@tek-tech/ears')

const yt = require('youtube-search-without-api-key')

const youtubedl = require('youtube-dl-exec')

class YTeeDownload extends Ear{

  downloader = youtubedl
  config = {
    dumpSingleJson: true,
    noWarnings: true,
    noCallHome: true,
    noCheckCertificate: true,
    preferFreeFormats: true,
    youtubeSkipDashManifest: true,
    referer: 'https://www.youtube.com/watch?v=6xKWiCMKKJg'
  }
  whenGotData(cb){
    if(this.data)cb(this.data)
    else{
      this.when(
        'gotdata',cb
      )
    }
  }
  async setData(cb){
    const {url} = this
    await this.downloader(
      url,this.config
    ).then(downloaddata =>{
      this.data = downloaddata
      this.trigger(
        'gotdata',this.data
      )
      this.setReady()
      if(cb)cb(this.data)
    } )
  }


  constructor(url){
    super()
    this.data = null
    this.url = url
    this.setData()
  }

}


class YTeeSearchResult extends Ear{
  renderHtml(cb){
    return `hello ${this._downloadlinks}`
  }
  getDownloadLinks(cb){
    this.whenGotDownloadLinks(
      cb
    )
  }
  getDownloadLink(format,cb){
    this.getDownloadLinks(
      links=>{
        cb(links.hasOwnProperty(format)?links[format]:null)
      }
    )
  }
  getTitle(){
    return this.getData('title')
  }
  getIllu(){
    return this.getData('illus').length?this.getData('illus')[0]:null
  }
  getDownloadData(cb){
    const download = new YTeeDownload(this.getData('url'))
    download.whenReady(
      ()=>{
        const data = download.data
        this._downloaddata = data
        this._downloadlinks = {}
        this._downloaddata.requested_formats.map(
          elem=>{
            this._downloadlinks[elem.ext] = {
              dl_link:elem.url,
              filesize:elem.filesize,
              raw:elem
            }
          }
        )
        this._gotdownloadlinks = true
        this.trigger(
          'gotdownloadlinks',this._downloadlinks
        )
        this.trigger(
          'gotdownloaddata',this._downloaddata
        )  
        if(cb)cb(data) 
      }
    )
  }
  assignRawData(raw){
    this._rawdata = raw
    this.assignData()
  }
  getRaw(rdn){
    return this.hasRaw(rdn) ? this._rawdata[rdn] : null
  }
  hasRaw(rawdataname){
    return this._rawdata && this._rawdata.hasOwnProperty(rawdataname)
  }
  assignData(){
    this._data = {}
    const title = this.getRaw('title')
    const duration = this.getRaw('duration_raw')
    const views = this.getRaw('views')
    const description = this.getRaw('description')
    const url = this.getRaw('url')
    const snippet = this.getRaw('snippet')
    const illus = snippet ? snippet.thumbnails:[]
    if(title&&url&&duration){
      this._data = {
        title,description,illus,snippet,views,description,duration,url
      }
    }

  }
  getData(info){
    return this.hasData(info)?this._data[info]:null
  }
  hasData(info){
    return this._data&&this._data.hasOwnProperty(info)
  }

  showUp(){
    return this._data
  }

  whenGotDownloadData(cb){
    if(this.gotDownloadData())cb(this._downloaddata)
    else this.when(
      'gotdownloaddata',cb
    )
  }
  whenGotDownloadLinks(cb){
    if(this.gotDownloadLinks())cb(this.downloadlinks)
    else this.when(
      'gotdownloadlinks',cb
    )
  }
  gotDownloadData(){
    return this._gotdownloaddata
  }
  gotDownloadLinks(){
    return this.gotdownloadlinks
  }
  constructor(raw){
    super()
    this.when(
      'gotdownloaddata',(data)=>{
        this.getDownloadLink(
          links=>{
            this.downloadlinks = links
            this.gotdownloadlinks = true
            this.trigger('gotdownloadlinks',links)
          }
        )
      }
    )
    this.assignRawData(raw)
    this.getDownloadData()
    this.whenGotDownloadData(
      ()=>{
        this.setReady()
      }
    )
  }

}

class YteeSearcher extends Ear{

  engine = yt
  lastresults = []

  async search(query,cb){

    const results =  await this.engine.search(query)
    const found = []
    results.map((result,idx)=>{
      found.push(new YTeeSearchResult(result))
      if(idx+1==results.length){
        if (cb) cb(found)
        this.lastresults.push(found)
      }
    })

  }

  constructor(){
    super()
    this.setReady()
  }

}

const Searcher = new YteeSearcher()
const Download = YTeeDownload
module.exports = {
  Searcher,Download
}