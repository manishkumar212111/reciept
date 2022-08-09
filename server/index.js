var express = require('express')
var app = express()
var axios = require("axios");
var { parseString } = require("xml2js");
var cors = require('cors')
app.use(cors())

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/company/:nip', async function(request, response) {
  let text = `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ns="http://CIS/BIR/PUBL/2014/07">
            <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing"> 
            <wsa:To>https://wyszukiwarkaregon.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc</wsa:To> 
            <wsa:Action>http://CIS/BIR/PUBL/2014/07/IUslugaBIRzewnPubl/Zaloguj</wsa:Action> </soap:Header>
            <soap:Body> <ns:Zaloguj>
            <ns:pKluczUzytkownika>eda04987a39a4f4b8075</ns:pKluczUzytkownika> </ns:Zaloguj>
            </soap:Body>
            </soap:Envelope>`;
            var config = {
                headers: {'Content-Type': 'application/soap+xml; charset=utf-8'}
            };
            let data = await axios.post("https://wyszukiwarkaregon.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc", text , config);
            console.log("****", data.data.split("<s:Envelope")[1] , "*****");
            parseString("<s:Envelope" +  data.data.split("<s:Envelope")[1], async function (err, results) {
                // console.log(err, results);
                // parsing to json
                // let data = JSON.stringify(results)
                // <dat:Nip>8971908835</dat:Nip>
                  
                // display the json data
                console.log("results",results["s:Envelope"]["s:Body"][0]["ZalogujResponse"][0]["ZalogujResult"]);

                let newText = `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" 
                xmlns:ns="http://CIS/BIR/PUBL/2014/07" 
                xmlns:dat="http://CIS/BIR/PUBL/2014/07/DataContract">
                   <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing"> <wsa:To>https://wyszukiwarkaregon.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc</wsa:To> <wsa:Action>http://CIS/BIR/PUBL/2014/07/IUslugaBIRzewnPubl/DaneSzukajPodmioty</wsa:Action> </soap:Header>
                   <soap:Body>
                      <ns:DaneSzukajPodmioty>
                         <!--Optional:-->
                         <ns:pParametryWyszukiwania>
                            <dat:Nip>${request.params.nip}</dat:Nip>
                         </ns:pParametryWyszukiwania>
                      </ns:DaneSzukajPodmioty>
                   </soap:Body>
                </soap:Envelope>`;
                const newConfig = {
                  headers: {'Content-Type': 'application/soap+xml; charset=utf-8', sid : results["s:Envelope"]["s:Body"][0]["ZalogujResponse"][0]["ZalogujResult"][0]}
                }
                console.log(newConfig);
                let newData = await axios.post("https://wyszukiwarkaregon.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc", newText , newConfig);
                console.log(newData.data.split("<s:Envelope")[1], "new e");
                  parseString("<s:Envelope" +  newData.data.split("<s:Envelope")[1], async function (err, results) {
                    parseString(results["s:Envelope"]["s:Body"][0]["DaneSzukajPodmiotyResponse"][0]["DaneSzukajPodmiotyResult"][0].replaceAll("\r\n", ""), async function (err, results) {
                      response.send(results);
                    });
                  });
                });
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
