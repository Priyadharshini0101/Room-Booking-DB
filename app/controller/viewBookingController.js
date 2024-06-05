app.controller('viewBookingController', ['$scope', '$timeout', function ($scope, $timeout) {
   
    $(document).ready(function(){
    $scope.values = null;
    var userId = window.localStorage.getItem("userId");
    console.log(userId);
        $scope.getData = function(){
        $.ajax({
            url: 'API/get_data.php?', 
            method: 'GET',
            data:{user_id:userId},
            success:function(response) {
                $scope.values=JSON.parse(response);
                var table = $('#myTable').DataTable({
                    data:$scope.values,
                    columns:[
                        {
                            title: '<input type="checkbox" class="checkAll"  />',
                            render: function (data, type, row) {
                                return '<input type="checkbox" class="checkbox" ng-model="" />';
                            }
                        },
                        { title: '#',
                        data: null,
                        render: (data, type, row, meta) => meta.row +1 },
                        {title:'NAME', data:'fullname' },
                        {title: 'EMAIL', data:'email'},
                        {title: 'ROOM TYPE', data:'roomtype'},
                        {title: 'AGE', data:'age'},
                        {
                            title: 'ROOM SIZE', data: 'roomSize',
                            render: function(data, type, row){
                                return data + ' -  BED';
                            } 
                        },
                        {
                            title: 'VIEW', data: 'view',
                            render:function(data, type, full, meta){
                        
                                return '<img src="' + data + '"  class="view" alt="View Image" data-row = \''+ JSON.stringify(full) +'\'  >'
                            }
                        },
                        {
                            title:'',
                            render:function(data,type, full, meta){
                                return '<div class="menu" data-row = \''+ JSON.stringify(full) +'\' row-index= \''+ meta.row +'\'> <div class="dot"></div> <div class="dot"></div> <div class="dot"></div>  </div>';
                            }
                        }
                    ],
                    paging:true,
                    pagingType: "simple_numbers",
                    dom: '<"top"t><"bottom d-flex"i<"ml-auto"lp>><"clear">',
                    language: {
                        info:"_START_ - _END_ of _TOTAL_",
                        lengthMenu: "Rows per page: _MENU_",
                        paginate: {
                            previous: '‹',
                            next:     '›',
                        },
                        aria: {
                            paginate: {
                                previous: 'Previous',
                                next:     'Next',
                            }
                        },  
                    },
                    drawCallback: function(settings) {         
                        var api = this.api();          
                        var pageInfo = api.page.info();       
                            var paginationDiv = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate');                     
                                var customPagination = '<span class="custom-pagination">' + (pageInfo.page + 1) + '/' + pageInfo.pages + '</span>';                  
                                    paginationDiv.find('span').replaceWith(customPagination);   
                    },
                    pageLength:10,
                    lengthMenu:[5,10,25,50,100],
                    columnDefs: [
                        { width:"500px", targets:[2,3,4,5,6,7]},
                        { "className": "dt-center ", "targets": [0,5,6,7] }, 
                        {
                            targets: [0,3,4,5,6,7], 
                            orderable: false,
                            className: 'no-toggle' 
                        },
                        { className: "font-weight-bold", targets: [1,2] }
                   ],
                    "order": [[1, 'asc']],
                    
                    searching: true, 
                    lengthChange: true,
                    
                })
                    $('#search').on('keyup', function () {  
                        var customSearchValue = $(this).val();   
                        table.search(customSearchValue).draw();  
                    });

                    $('#myTable').on('click','.view',function(){
                        $scope.rowData = JSON.parse($(this).attr('data-row'));
                        $scope.userComponent = $scope.rowData;
                       
                        $timeout(function () {
                            $('#view-data').modal("show"); 
                        }, 1000);  
                    });

                    $('#myTable').on('click','div.menu',function(){
                        $scope.rowData = JSON.parse($(this).attr('data-row'));
                        $scope.userComponent = "";
                        $scope.rowindex = $(this).attr('row-index');
                        console.log($scope.rowindex)
                        $scope.gender = ['Male','Female','Transgender'];
                        $scope.idtype = [ 'Aadhar card', 'Voter ID', 'PAN CARD', 'Driving Licence'];
                        $scope.roomsizes = [ '1', '2', '3', '4' ];
                        $scope.roomtypes = ['Open','AC', 'NON - AC'];
                        $scope.userComponent = $scope.rowData;
                        $timeout(function () {
                            $('#edit-data').modal("show"); 
                            }, 1000);  
                          
                    });

                    $('#myTable').on('click','.checkAll',function(){
                        var isChecked = $(this).prop('checked');
                        $('.checkbox').prop('checked', isChecked);    
                    });

                    $('#myTable').on('click','.checkbox',function(){
                        var allCheckboxes = $('.checkbox');
                        var selectedCheckboxes = $('.checkbox:checked');
                        $('.checkAll').prop('checked', allCheckboxes.length === selectedCheckboxes.length);
                    }); 
                 }   
            });
         }

        $scope.getData();
        console.log($scope.values);
    })

    var userId = window.localStorage.getItem("userId");

    if(!userId){
        window.location.href = '#/login';
    }   

    window.history.pushState(null, null, window.location.href);
    window.addEventListener('popstate', function (event) {
    window.history.pushState(null, null, window.location.href);
    });
}])

.component('viewData', { 
    templateUrl:'app/view/view-component.html',
    bindings:{
        values:'<',
    },
})

.component('editData', { 
    templateUrl:'app/view/edit-component.html',
    bindings:{
        values:'=',
        options1:'=',
        options2:'=',
        options3:'=',
        options4:'=',
        rowIndex:'=',
    },
    controllerAs:'$ctrl',
    controller:  function ($scope) {
        var ctrl = this;
        ctrl.dateFormat = function(data){
            var dateString = data;
            var date = new Date(dateString);
            date.setMinutes(date.getMinutes() + 330);
            var year = date.getUTCFullYear();
            var month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Add 1 to month since it's zero-based
            var day = date.getUTCDate().toString().padStart(2, '0');
            return year + '-' + month + '-' + day;
        };

        ctrl.checkindate="";
        ctrl.expectedcheckoutdate = "";
       
        $jq(document).ready(function(){
            $jq('#checkindate').datepicker({
                format: 'yyyy-mm-dd',
                autoclose: true,
                todayHighlight: true,
              });

              $jq('#expectedcheckoutdate').datepicker({
                format: 'yyyy-mm-dd',
                autoclose: true,
                todayHighlight: true,
              });
        });

        $jq('#checkindate').on('changeDate', function (e) {
            ctrl.values.checkindate =  ctrl.dateFormat(e.date);
        });
        
      
        $jq('#expectedcheckoutdate').on('changeDate', function (e) {
            ctrl.values.expectedcheckoutdate =  ctrl.dateFormat(e.date);
        });
    
        ctrl.submitData = function () {
            var userId = window.localStorage.getItem("userId");
            $.ajax({
                url: 'API/save_data.php',
            method: 'POST',
            data: {  jsonData:JSON.stringify(ctrl.values), user_id:userId},
            success: function(response) {
                console.log('Response:', response);
                alert("Your data has been updated");
                location.reload();
                // console.log(ctrl.rowIndex);
                // $('#myTable').DataTable().row(ctrl.rowIndex).data(ctrl.values).draw();
            },
            error:function(error){
                    console.log(error);
            }
            });
        
        };
    },
    
})







