const express = require('express')
const app = express()
const pdf = require('html-pdf')
const ejs = require('ejs');
const erroHandler = require('errorhandler')

app.use(express.json());

app.post('/', (req, res) => {
    ejs.renderFile('./templates/index.ejs', req.body, (err, html) => {
        if (err) {
            console.log(req.body)
            return res.status(500).json( {message: 'Internal Server Error'} );
        }

        options = {
            format: "A4",
            border: {
                right: '8'
            }
        };

        pdf.create(html, options).toFile('./uploads/report.pdf', (err, response) => {
            if (err) {
                return res.json({message: 'falha ao gerar o pdf'});
            }

            return res.json({message: 'pdf gerado'})
        });

        
    })
    
})

app.get("/download", (req, res) => {
    res.type('pdf');
    res.download('./uploads/report.pdf');
})

app.listen(3000)