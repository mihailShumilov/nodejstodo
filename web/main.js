/**
 * Created by godson on 4/9/15.
 */
var app = angular.module('todojs', []);

app.controller('mainController', [ '$scope','$http', function( $scope, $http ) {
    $scope.formData = {
        text: "",
        userid: ""
    };
    $scope.isLogged = false;

    $scope.login = function(){
        $scope.isLogged = true;
        console.log($scope.formData);
        getToDos();
    };

    function getToDos()
    {
        // when landing on the page, get all todos and show them
        $http.get( '/api/todos?userid='+$scope.formData.userid )
            .success( function ( data )
                      {
                          $scope.todos = data;
                          console.log( data );
                      } )
            .error( function ( data )
                    {
                        console.log( 'Error: ' + data );
                    } );
    }
    // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {
        $http.post('/api/todos', $scope.formData)
            .success(function(data) {
                         $scope.formData.text = ""; // clear the form so our user is ready to enter another
                         $scope.todos = data;
                         console.log(data);
                     })
            .error(function(data) {
                       console.log('Error: ' + data);
                   });
    };

    // delete a todo after checking it
    $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                            getToDos();
                     })
            .error(function(data) {
                       console.log('Error: ' + data);
                   });
    };
}]);