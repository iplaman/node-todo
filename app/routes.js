var Todo = require('./models/todo');
var https = require('https');
var https = require('https');

function getCityId() {
    https.get("https://www.metaweather.com/api/location/search/?query=atlanta", function (res) {
        var body = ''; // Will contain the final response
            // Received data is a buffer.
            // Adding it to our body
            res.on('data', function (data) {
                body += data;
            });
            // After the response is completed, parse it and log it to the console
            res.on('end', function () {
                var parsed = JSON.parse(body);
                console.log("getCityId-"+parsed[0].woeid+"----");
                weather = getWeather(parsed[0].woeid);
                console.log(weather)
                return weather
            });

        })
            // If any error has occured, log error to console
            .on('error', function (e) {
                console.log("Got error: " + e.message);
            });
        
};
function getWeather(cityId) {
    https.get("https://www.metaweather.com/api/location/2357024", function (resp) {
        var bodyw = ''; // Will contain the final response
            var bodynew = '';
            // Received data is a buffer.

            // Adding it to our body
            resp.on('data', function (data) {
                bodyw += data;
                console.log("in getWeather")
            });
            // After the response is completed, parse it and log it to the console
            resp.on('end', function (body) {
                console.log("getWeather"+body);
                console.log("getWeather"+bodynew);
                console.log("getWeather"+bodyw);
                // var parsed = JSON.parse(body);
                return bodyw;
            });

        })
            // If any error has occured, log error to console
            .on('error', function (e) {
                console.log("Got error: " + e.message);
            });
};

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function (req, res) {
        
        // city_id = getCityId();

        
        weather = getCityId(); 
        console.log(weather)
        res.send(weather)
        

    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            text: req.body.text,
            done: false
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getTodos(res);
        });

    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function (req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
