app.controller('loginController', ['$scope', '$timeout', function ($scope, $timeout) {
    var page = "#/roomBooking";
 
    //Validating registration form
    $scope.validateLoginForm = function() {
      const message = document.getElementById('message');
      const username =document.getElementById('username');
      const password = document.getElementById('password');
      const userType = document.querySelector("input[name='options']:checked");
      if (username.value == "" || password.value == "") {
        alert("Enter all data");
      } else {
         const requestData = {
          name: username.value,
          password: password.value,
          action: "getUserData"
         }
        $.ajax({
          url: "API/Controller.php?name=" + username.value + "&password=" + password.value + "&action=getUserData",
          type: "GET",
          //  contentType: "application/json", 
          // data: JSON.stringify(requestData),

          success:function(response) {
            console.log(response);
            if(response){
              message.innerText = userType.value +  ' - ' + username.value + ' ' + "Sign In Successfully";
              localStorage.setItem("userId",response);
              $('#authentication-success').modal("show");
            }else{
              alert("Incorrect email or password");
             
            }
          },     
        });

      //     $timeout(function () {
      //         $('#authentication-success').modal("toggle");
      //         // window.location.href = page;
      //   }, 1000);  
      }  
    }
        
    var userId = window.localStorage.getItem("userId");
    if(userId){
        window.location.href = page;
    }
}])






 

