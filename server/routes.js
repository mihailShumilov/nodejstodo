/**
 * Created by godson on 4/9/15.
 */
var Todo = require('./models/todo');

module.exports = function(app) {

    // get all todos
    app.get('/api/todos', function(req, res) {
        console.log(req.params['userid']);
        Todo.find({ userid: req.param('userid') },function(err, todos) {
            if (err) {
                res.send( err )
            }

            res.json(todos);
        });
    });

// create todo
    app.post('/api/todos', function(req, res) {

        Todo.create(
            {
                userid: req.param('userid'),
                text : req.body.text,
                done : false
            },
            function(err, todo) {
                if (err) {
                    res.send( err );
                }

                Todo.find({ userid: req.param('userid')},function(err, todos) {
                    if (err) {
                        res.send( err )
                    }
                    res.json(todos);
                });
            }
        );

    });

// delete a todo
    app.delete('/api/todos/:todo_id', function(req, res) {
        Todo.remove(
            {
                _id : req.params.todo_id
            },
            function(err, todo) {
                if (err) {
                    res.send( err );
                }
                res.json({"status":"ok"});
            }
        );
    });

// web
    app.get('*', function(req, res) {
        res.sendfile('./web/index.html');
    });
};