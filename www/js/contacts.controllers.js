angular.module('contacts.controllers', ['ngCordova', 'angular-spinkit', 'contacts.services'])

.controller('ContactsHomeController', ['$scope', '$cordovaContacts', '$ionicPlatform', '$localstorage',
                                          function ($scope, $cordovaContacts, $ionicPlatform, $localstorage) {
        $scope.loading = true;
        $scope.contacts = $localstorage.getObject('contact_list');
        $ionicPlatform.ready(function () {

            var options = new ContactFindOptions();
            options.filter = "";
            options.multiple = true;
            var fieldsToFilter = ['name', 'desiredName'];

            $cordovaContacts.find(options).then(
                function (result) {
                    $scope.contacts = $scope.filterNonNull(result);
                    $scope.loading = false;
                    $localstorage.setObject('contact_list', result);
                },
                function (error) {

                }
            );
        });

        var colorArray = ['#f0b840', '#43cee6', '#4a87ee', '#66cc33', '#ef4e3a', '#8a6de9'];
        $scope.getButtonColor = function (index) {
            return colorArray[index % 6];
        };
        $scope.filterNonNull = function(results) {
              return results.filter(function(value) {
                  return value.name.formatted.trim() !== "" &&
                      (value.phoneNumbers.length > 0 || value.emails.length > 0);
              });
        };
}]);