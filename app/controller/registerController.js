app.controller('registerController', ['$scope', function ($scope) {
    $scope.checkPassword = false;
    var page = "#/login"; 
 
    $scope.register = { 
        id:Math.floor(1000 + Math.random() * 9000).toString(),   
        userType:"",
        name:"",
        email:"",
        phonenumber:"",
        password:"",
        action:"",
       
    
        };

    
   
    //Validating Register form
    $scope.validateRegisterForm = function(){
        const username = document.getElementById("username");
        const password = document.getElementById("password");
        const reenterpassword = document.getElementById("reenterpassword");
        const message = document.getElementById('message');
        const userType = document.querySelector("input[name='options']:checked");
        if(password.value != reenterpassword.value){
            alert("Password doesn't match!");
            $scope.checkPassword = true;
        }else{
            $scope.checkPassword = false;
            
            if(!$scope.checkPassword){
                $scope.register.userType = userType.value;
                $scope.register.action = "insertUserData"

                $.ajax({
                    url: 'API/Controller.php',
                    type: 'POST',
                    data: JSON.stringify($scope.register),
                    success: function(response) {
                        if(response == true){
                             message.innerText = `${userType.value} - ${username.value} Sign Up Successfully`;
                              $('#authentication-success').modal("show");     
                        }else{
                            alert(response);
                        }     
                    }
                });
            }
        }  
    }
    
    //Pop-up Navigation
    $scope.navigate = function(){
        window.location.href=page;
    }

    //Validating password
    var userId = window.localStorage.getItem("userId");
    if(userId){
        window.location.href = page;
    }
}]);

