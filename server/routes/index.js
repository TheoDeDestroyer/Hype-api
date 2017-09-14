const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/hype';

router.get('/', (req, res, next) => {
  res.sendFile(path.join(
    __dirname, '..', '..', 'client', 'views', 'index.html'));
});


router.get('/', (req, res, next) => {
    res.sendFile('index.html');
});

router.post('/api/v1/hype', (req, res, next) => {
    const results = [];
    // Grab data from http request
    const data = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        age: req.body.age,
        email: req.body.email,
        password: req.body.password
    };
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err });
        }
        // SQL Query > Insert Data
        client.query('INSERT INTO public.users(first_name, last_name, age, email, password) values($1, $2, $3, $4, $5)', [data.first_name, data.last_name, data.age, data.email, data.password]);
        // SQL Query > Select Data
        const query = client.query('SELECT * FROM public.users ORDER BY tenant_id ASC');
        // Stream results back one row at a time
        query.on('row', (row) => {
            results.push(row);
        });
        // After all data is returned, close connection and return results
        query.on('end', () => {
            done();
            return res.json(results);
        });
    });
});


/* GET home page. */
router.get('/api/v1/hype', (req, res, next) => {

    const results = [];
    //get pg client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
        //Handle errors
        if (err) {
            done();
            consle.log(err);
            return res.status(500).json({ success: false, data: err });
        }
        const query = client.query('SELECT * FROM public.users ORDER BY tenant_id ASC;');
        //Stream results back one row at a time
        query.on('row', (row) => {
            results.push(row);
        });
        query.on('end', () => {
            done();
            return res.json(results);
        });
    });
});

router.put('/api/v1/hype/:hype_id', (req, res, next) => {
    const results = [];
    // Grab data from the URL parameters
    const id = req.params.hype_id;
    // Grab data from http request
    const data = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        age: req.body.age,
        email: req.body.email,
        password: req.body.password
    };
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err });
        }
        // SQL Query > Update Data
        client.query('UPDATE public.users SET first_name=($1), last_name=($2), age=($3), email=($4), password=($5) WHERE tenant_id=($6)', [data.first_name, data.last_name, data.age, data.email, data.password, id]);
        // SQL Query > Select Data
        const query = client.query("SELECT * FROM public.users ORDER BY tenant_id ASC");
        // Stream results back one row at a time
        query.on('row', (row) => {
            results.push(row);
        });
        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });
});

router.delete('/api/v1/hype/:hype_id', (req, res, next) => {
    const results = [];
    // grab data from url params
    const id = req.params.hype_id;
    //get postgres pool client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
        //Handle errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }
        //SQL query
        client.query('DELETE FROM public.users WHERE tenant_id=($1)', [id]);
        //sql select
        var query = client.query('SELECT * FROM public.users ORDER by tenant_id ASC');
        query.on('row', (row) => {
            results.push(row);
        });
        // after all data is returned close connection and return results
        query.on('end', () => {
            done();
            return res.json(results);
        });
    });
});


module.exports = router;