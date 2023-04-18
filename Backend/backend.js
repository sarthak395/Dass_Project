const express = require('express');
const bodyParser = require('body-parser')

//extract data from csv file and store in array
const csv = require('csv-parser');
const fs = require('fs');
const results = [];
fs.createReadStream('../Memory/Memory_enhanced.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;

// add filter on size and return the filtered data
app.post('/filter', (req, res) => {
    const size = req.body.size;
    const freq = req.body.freq;
    const company = req.body.company;
    console.log(company.length) ;
    // output data items whose Size contains the word "8GB"
    const filteredData = results.filter((item) => {

        let sizetrue = false;
        if (size.length == 0) {
            sizetrue = true;
        }
        else {
            size.forEach(element => {
                if(item.Size.includes(element))
                    sizetrue = true;
            });
        }


        let freqtrue = false;

        if (freq.length == 0) {
            freqtrue = true;
        }
        else {
            freq.forEach(element => {
                if(item.Frequency.includes(element))
                    freqtrue = true;
            })
        }


        let companytrue = false;
        if (company.length == 0) {
            companytrue = true;
        }
        else {
            company.forEach(element => {
                if(item.company.includes(element))
                    companytrue = true;
            })
        }

        return sizetrue && freqtrue && companytrue;
    });


    res.status(200).json({ data: filteredData });
});

app.get('/', (req, res) => {
    res.send(results);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});