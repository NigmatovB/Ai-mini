import express, { Express, Request, Response } from 'express'
import { format, join } from 'path/posix';
import fs from 'fs'
 
const app: Express  = express();
// const port = 4000;
const PORT = process.env.PORT || 6000;

app.use( express.static( join( process.cwd(), 'src', 'public' ) ) )

app.get('/', (req : Request, res : Response) => {
  res.sendFile( join( __dirname, 'views' , 'index.html' ) )
});

app.get( '/data', async ( req: Request, res, Response ) => {
   const data =  JSON.parse(fs.readFileSync( join( __dirname, 'helper', 'data.json' ), 'utf-8' ))
    res.send( data )
} )

app.listen( PORT )