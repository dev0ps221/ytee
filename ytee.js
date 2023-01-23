const { Ear } = require('@tek-tech/ears')
const yt = require('youtube-search-without-api-key')
const youtubedl = require('youtube-dl-exec')


const { YteeSearcher } = require('./searcher')
const { YTeeDownload } = require('./download')


const Searcher = new YteeSearcher()

const Download = YTeeDownload

module.exports = {
  Searcher,Download
}