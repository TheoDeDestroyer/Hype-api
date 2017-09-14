angular.module('nodeHype', [])
    .controller('mainController', ($scope, $http) => {
        $scope.formData = {};
        $scope.hypeData = {};
        // Get all hypes
        $http.get('/api/v1/hype')
            .success((data) => {
                $scope.hypeData = data;
                console.log(data);
            })
            .error((error) => {
                console.log('Error: ' + error);
            });
            // Create a new hype
            $scope.createHype = () => {
                $http.post('/api/v1/hype', $scope.formData)
                    .success((data) => {
                        $scope.formData = {};
                        $scope.hypeData = data;
                        console.log(data);
                    })
                    .error((error) => {
                        console.log('Error: ' + error);
                    });
            };
            // Delete a hype
            $scope.deleteHype = (hypeID) => {
                $http.delete('/api/v1/hype/' + hypeID)
                    .success((data) => {
                        $scope.hypeData = data;
                        console.log(data);
                    })
                    .error((data) => {
                        console.log('Error: ' + data);
                    });
            };
    });