const express = require('express')
const request = require('request')
const cheerio = require('cheerio')
const path = require("path");
const app = express()

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'))
})

app.get('/poa', (req, res) => {

  const url = 'http://portaltransparencia.procempa.com.br/portalTransparencia/despPorOrgaoPesquisa.do?viaMenu=true'

  request(url, (err, response, html) => {
    if (err) return console.error(err)

    const $ = cheerio.load(html)
    const data = $('.bodySearchList tbody tr').toArray().slice(2)
      .map(tag => ({
        code: $(tag).find('td').eq(0).text(),
        name: $(tag).find('td').eq(1).text(),
        estimate: $(tag).find('td').eq(3).text(),
        expense: $(tag).find('td').eq(4).text()
      }))
      .filter(value => value.code !== '' && 
                       value.name !== '' &&
                       value.estimate !== '' &&
                       value.expense !== '')
    console.log(data)
  })
})

app.listen('3000')
console.log('\nAccess http://localhost:3000/poa and see here the result: \n\n')
exports = module.exports = app