
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
module.exports = {
    YteeSearcher
}