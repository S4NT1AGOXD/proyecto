const express = require('express')
const { dbConnection } = require('../database/config')
const cors  = require('cors');//Implementar seguridad
const bodyParser = require('body-parser')//Recibir datos de formularios html

class Server{

    constructor(){
        this.app = express()
        this.port = process.env.PORT //Capturando variable puerto
        this.usuarioPath = '/api/usuarios' //Ruta pública
        this.middlewares()
        this.routes()
        this.conectarDB() 
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Escuchando por el puerto ${this.port}`)
        })
    }

    middlewares(){
        this.app.use(express.static(__dirname + "/public"));
        
        this.app.use( cors() );

        this.app.use(bodyParser.json()) // for parsing application/json
    }

    routes() {
       this.app.use(this.usuarioPath, require('../routes/usuarios'))
    }

    async conectarDB(){
        await dbConnection() //Esperar la respuesta del servidor        
    }
}

module.exports =  Server 
