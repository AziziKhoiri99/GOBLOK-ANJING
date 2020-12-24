const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const { response } = require('express');
const saltRounds = 10;

const app = express();
const port = 9000;


app.use(cors(
));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


const koneksi =  mysql.createConnection({
   host: 'localhost',
   user: 'Azizi',
   password: '1945',
   database: 'APLIKASI_ABSENSI'
});

koneksi.connect((err) => {
   if(err) throw err;
   console.log("Koneksi Database Berhasil Terkoneksi");
}); 

//<!--AAAAAAAABBBBBBBBBBSSSSSEEEEENNNNNNNSSSSSSSIIII--!>//

app.get('/api/get', (req, res) => {
   const sqlSelect = 
      "SELECT * FROM ABSEN";
   koneksi.query(sqlSelect, (err, hasil) => {
      console.log(hasil);
      res.send(hasil);
   });
}); 

app.post('/api/insert', (req, res) => {
   const NAMA = req.body.NAMA;
   const ABSENSI = req.body.ABSENSI;

   const sqlInsert = 
      "INSERT INTO ABSEN (NAMA, ABSENSI) VALUES (?, ?)"
   koneksi.query(sqlInsert, [NAMA, ABSENSI], (err, hasil) => {
      console.log(hasil);
   })
});

//<!--SSSSSSSSSSSSSIIIIIIIISSSSSSWWWWWWAAAAA--!>//

app.get('/register', (req, res) => {
   const sqlSelect1 = 
      "SELECT * FROM DATA_SISWA";
   koneksi.query(sqlSelect1, (err, hasil) => {
      console.log(err);
      res.send(hasil);
   });
});

app.post('/register/siswa', (req, res) => {
   const username = req.body.USERNAME;
   const password = req.body.PASSWORD;
   const nisn = req.body.NISN;
   const nama = req.body.NAMA;
   const kelas = req.body.KELAS;
   const alamat = req.body.ALAMAT;
  
   const sqlRegister =
      "INSERT INTO DATA_SISWA (USERNAME, PASSWORD, NISN, NAMA, KELAS, ALAMAT) VALUES (?, ?, ?, ?, ?, ?)"
   koneksi.query(sqlRegister, [username, password, nisn, nama, kelas, alamat], (err, hasil) => {
         console.log(err);
      }
   );
});

app.delete('/register/siswa/delete/:USERNAME', (req, res) => {
   const name = req.params.USERNAME;
   const sqlDelete = 
      "DELETE FROM DATA_SISWA WHERE USERNAME=?";

   koneksi.query(sqlDelete, name, (err, hasil) => {
      if(err)
      console.log(err);
   })      
});

app.put('/register/siswa/update', (req, res) => {
   const username = req.body.USERNAME;
   const password = req.body.PASSWORD;
   const nisn = req.body.NISN;
   const nama = req.body.NAMA;
   const kelas = req.body.KELAS;
   const alamat = req.body.ALAMAT;
   const sqlUpdate = 
      "UPDATE DATA_SISWA SET USERNAME=?, PASSWORD=?, NISN=?, NAMA=?, KELAS=?, ALAMAT=? WHERE ID=?" ;

   koneksi.query(sqlUpdate, [username, password, nisn, nama, kelas, alamat], (err, hasil) => {
      if(err)
      console.log(err);
   })      
});

//<!--GGGGGGGGGUUUUUUUUUURRRRRRRRRUUUUUUU--!>//

app.get('/register/guru', (req, res) => {
   const sqlSelect1 = 
      "SELECT * FROM DATA_GURU";
   koneksi.query(sqlSelect1, (err, hasil) => {
      console.log(err);
      res.send(hasil);
   });
});

app.post('/register/siswa', (req, res) => {
   const id = req.body.ID;
   const username = req.body.USERNAME;
   const password = req.body.PASSWORD;
   const nik = req.body.NISN;
   const nama = req.body.NAMA;

   const sqlRegister =
      "INSERT INTO DATA_SISWA (ID, USERNAME, PASSWORD, NIK, NAMA) VALUES (?, ?, ?, ?, ?)"
   koneksi.query(sqlRegister, [id, username, password, nik, nama], (err, hasil) => {
         console.log(err);
      }
   );
});

app.delete('/register/guru/delete/:USERNAME', (req, res) => {
   const name = req.params.USERNAME;
   const sqlDelete = 
      "DELETE FROM DATA_GURU WHERE USERNAME=?";

   koneksi.query(sqlDelete, name, (err, hasil) => {
      if(err)
      console.log(err);
   })      
});

app.put('/api/update', (req, res) => {
   const id = req.body.ID;
   const username = req.body.USERNAME;
   const password = req.body.PASSWORD;
   const nik = req.body.NISN;
   const nama = req.body.NAMA;
   const sqlUpdate = 
      "UPDATE DATA-GURU SET ID=?, USERNAME=?, PASSWORD=?, NIK=?, NAMA=? WHERE ID=?";

   koneksi.query(sqlUpdate, [id, username, password, nik, nama], (err, hasil) => {
      if(err)
      console.log(err);
   })      
});

//<!--LLLLLLLLOOOOOOOOOOGGGGGGGGIIIIIIIINNNNNNN--!>//

app.get('/login', (req, res) => {
   if (req.session.user) {
      res.send({loggedIn: true, user: res.session.user})
   } else {
      res.send({loggedIn: false})
   }
})

app.post('/login', (req, res) => {
   const username = req.body.USERNAME;
   const password = req.body.PASSWORD;

   const sqlLogin =
      'SELECT * FROM ABSEN WHERE USERNAME=?'
   koneksi.query (sqlLogin, [username, password],
      (err, hasil) => {
         if (err) {
            res.send({err: err});
         }

         if (hasil.length > 0) {
            res.send(hasil);
         } else {
            alert('USERNAME ATAU PASSWORD TIDAK TERDAFTAR')
            res.render()
         }
      }
   );
});
  
app.listen(port, () => {
    console.log(`App berjalan pada port ${port}`);
})