const express = require ('express');
const Database = require ('./mysqlcon');
var cors = require ('cors'); //var
const port = 3001;
const app = express();

app.use(cors());
app.use(express.json())

app.get('/teacher', (req, res)=>
{ 
    const db= new Database()
    const cn=db.getConnection()
    cn.execute(
        'SELECT *FROM teacher', [],
        function(err, results, fields) {      
          res.json(results)      
        }
      );   
})

//Obtener un slo profesor
app.get('/teacher/:id', (req, res) => {
    const { id } = req.params;
    const db = new Database()
    const cn = db.getConnection()
    cn.execute(
      'SELECT * FROM teacher WHERE id = ?', [id],
      function (err, results, fields) {
          res.json(results[0])
      }
    );
})

//Obtener solo un alumno
app.get('/alumno/:id', (req, res) => {
    const { id } = req.params;
    const db = new Database()
    const cn = db.getConnection()
    cn.execute(
      'SELECT * FROM alumno WHERE id = ?', [id],
      function (err, results, fields) {
          res.json(results[0])
      }
    );

})

//Ver tabla
app.get('/alumno', (req, res)=>
{ 
    const db= new Database()
    const cn=db.getConnection()
    cn.execute(
        'SELECT *FROM alumno', [],
        function(err, results, fields) {      
          res.json(results)      
        }
      );   
})

//Ver tabla USUARIOS
app.get('/usuario', (req, res)=>
{ 
    const db= new Database()
    const cn=db.getConnection()
    cn.execute(
        'SELECT *FROM usuarios', [],
        function(err, results, fields) {      
          res.json(results)      
        }
      );   
})

//request peticion   response response
app.post('/teacher', (req, res) => {

  const body = req.body;
  const db = new Database()
  const cn = db.getConnection()
  const query = `INSERT INTO teacher
              (nombre, apellido, email, num_cedula, profesion, cargo ) VALUES
               (?,?,?,?,?,?)`
  cn.execute(
      query, [body.nombre, body.apellido, body.email, body.num_cedula, body.profesion, body.cargo],
      function (err, results, fields) {
          if (err) {
              res.status(500).json({
                  message: err.message
              })
          }
          else {
              res.json(body)
          }
      }
  );

})

//update teacher
app.put('/teacher', (req, res) => {
  const body = req.body;
  console.log (body);
  const db = new Database()
  const cn = db.getConnection()

  const query = `UPDATE teacher     
              SET nombre=?, apellido=?, email=?, num_cedula=?, profesion=?, cargo=? 
              WHERE id = ?`;
  cn.execute(
      query, [body.nombre, body.apellido, body.email, body.num_cedula, body.profesion, body.cargo, , body.id],
      function (err, results, fields) {
          if (err) {
              res.status(500).json({
                  message: err.message
              })
          }
          else {
              res.json(body)
          }
      }
  );
})

//request peticion   responde response
app.post('/alumno', (req, res) => {

  const body = req.body;
  const db = new Database()
  const cn = db.getConnection()
  const query = `INSERT INTO alumno
              (nombre, apellido, num_cedula, curso, num_celular) VALUES
               (?,?,?,?,?)`
  cn.execute(
      query, [body.nombre, body.apellido, body.num_cedula, body.curso, body.num_celular],
      function (err, results, fields) {
          if (err) {
              res.status(500).json({
                  message: err.message
              })
          }
          else {
              res.json(body)
          }
      }
  );

})

//Update register
app.put('/alumno', (req, res) => {
    const body = req.body;
    console.log (body);
    const db = new Database()
    const cn = db.getConnection()
  
    const query = `UPDATE alumno     
                SET nombre=?, apellido=?, num_cedula=?, curso=?, num_celular=? 
                WHERE id = ?`;
    cn.execute(
        query, [body.nombre, body.apellido, body.num_cedula, body.curso, body.num_celular , body.id],
        function (err, results, fields) {
            if (err) {
                res.status(500).json({
                    message: err.message
                })
            }
            else {
                res.json(body)
            }
        }
    );
  })

//Habilitamos el servidor en el puerto indicado
//En esta caso sera 3001 porque el 3000 ya es usado por React
app.listen(port, () => {
  console.log('Sevidor Express en: http://localhost:' + port);
})


