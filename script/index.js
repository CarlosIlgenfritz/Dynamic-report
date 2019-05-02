//browserify index.js > bundle.js
const request = require('request')
var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;
var tabelaFinal;

var buttonTable = document.getElementById("button-table").addEventListener("click",function(){
    
    request('https://jsonplaceholder.typicode.com/photos',function(error,response,body){
    console.log('error:', error)
    console.log('statusCode:', response && response.statusCode)
    
    var content = []
    content = JSON.parse(body)
    var a = content.map(function(obj) {
        return Object.keys(obj).sort().map(function(key) { 
          return obj[key]
        })
      })
      a.unshift(["AlbumId","id","url","title","thumbnailUrl"])
            
      var table = document.createElement("table")
      table.border = "1"
      var columnCount = a[0].length
      var row = table.insertRow(-1)
      for(var i=0; i<columnCount; i++){
          var headerCell = document.createElement("th")
          headerCell.innerHTML = a[0][i]
          row.appendChild (headerCell)
      }
      for(var i=1; i<a.length; i++){
        row = table.insertRow(-1)
        for(var j=0; j<columnCount; j++){
            if(j == 2 || j == 4){
              var url = a[i][j]
              var img = `<img src=${url} width="150px" heigth="150px" >`
              var cell = row.insertCell(-1)
              cell.innerHTML = img
            }else{
              var cell = row.insertCell(-1)
              cell.innerHTML = a[i][j]
            }
        }
    }
      var dvTable = document.getElementById ("dvTable")
      dvTable.innerHTML = "" 
      dvTable.appendChild (table)
      tabelaFinal = a;
    })
})
var buttonDowload = document.getElementById("button-dowload").addEventListener("click", function(){
  console.log("tabelafinal",tabelaFinal)
  
    var docDefinition = {
      content:[
        { text: `Campo Grande, 30 de abril de 2019, 
        Relatório Modelo de Atividades Gerais,
        Responsável Técnico: Carlos Ilgenfritz,
        Função: Cuidador de Bugs
        Telefone: 61 99993333	E-mail: carlos@agrointeli.com.br 	Endereço: Rua Brasil 205`, style: 'header' 
        },
        {
          style:'tableExample',
          table:{
            headerRows:1,
            width:['*','auto',100,'*',],
            body:tabelaFinal
          }
        },
      ],
        style:{
          header:{
            fontSize: 18,
            bold: true
          },
          tableExample: {
            margin: [0, 5, 0, 15]
          },
          tableHeader: {
            bold: true,
            fontSize: 13,
            color: 'black'
          }
        }
      }
    pdfMake.createPdf(docDefinition).download()
})