app.controller('availabilityController', ['$scope', function ($scope) {
    // Static array of rooms with availability status and booking information
    var totalRooms = [

        { room_number: 1, room_type: 'Standard', room_size: 1, booking: null },
        { room_number: 2, room_type: 'Suite', room_size: 4, booking: { checkIn: '2023-08-10 14:00', checkOut: '2023-08-15 12:00' } },
        { room_number: 3, room_type: 'Standard', room_size: 1, booking: null },
        { room_number: 4, room_type: 'Standard', room_size: 1, booking: { checkIn: '2023-08-18 15:00', checkOut: '2023-08-23 10:00' } },
        { room_number: 5, room_type: 'Deluxe', room_size: 3, booking: null },
        { room_number: 6, room_type: 'Standard', room_size: 1, booking: null },
        { room_number: 7, room_type: 'Suite', room_size: 4, booking: { checkIn: '2023-08-14 12:00', checkOut: '2023-08-18 10:00' } },
        { room_number: 8, room_type: 'Deluxe', room_size: 3, booking: null },
        { room_number: 9, room_type: 'Standard', room_size: 1, booking: null },
        { room_number: 10, room_type: 'Deluxe', room_size: 3, booking: null },
        { room_number: 11, room_type: 'Standard', room_size: 1, booking: null },
        { room_number: 12, room_type: 'Deluxe', room_size: 3, booking: null },
        { room_number: 13, room_type: 'Standard', room_size: 1, booking: { checkIn: '2023-08-25 14:00', checkOut: '2023-08-30 12:00' } },
        { room_number: 14, room_type: 'Standard', room_size: 1, booking: null },
        { room_number: 15, room_type: 'Deluxe', room_size: 3, booking: null },
        { room_number: 16, room_type: 'Standard', room_size: 1, booking: null },
        { room_number: 17, room_type: 'Standard', room_size: 1, booking: null },
        { room_number: 18, room_type: 'Deluxe', room_size: 3, booking: null },
        { room_number: 19, room_type: 'Standard', room_size: 1, booking: { checkIn: '2023-08-12 14:00', checkOut: '2023-08-17 12:00' } },
        { room_number: 20, room_type: 'Standard', room_size: 1, booking: null },
        { room_number: 21, room_type: 'Suite', room_size: 4, booking: null },
        { room_number: 22, room_type: 'Standard', room_size: 1, booking: null },
        { room_number: 23, room_type: 'Deluxe', room_size: 3, booking: null },
        { room_number: 24, room_type: 'Standard', room_size: 1, booking: { checkIn: '2023-08-22 14:00', checkOut: '2023-08-27 12:00' } },
        { room_number: 25, room_type: 'Deluxe', room_size: 3, booking: null }
    ];


    $scope.isRoomAvailable = false;
    $scope.availableRooms = [];

    //Available rooms array
    $scope.rooms = [];

    $scope.isRoomAvailable = true;
    $scope.availableRooms = [];

    $scope.getRoomNumbers = function (rooms) {
        return rooms.map(function (room) {
            return room.room_number;
        }).join(', ');
    };


    //Setting the check in and check out so that check in date is less than check out date
    const minDate = document.getElementById('checkindate');
    const maxDate = document.getElementById('checkoutdate');

    //Limiting checkOut date
    $scope.setCheckOutDate = function(){
        const minDateValue = minDate.value;
        maxDate.min = minDateValue;
    }

    //Limiting checkIn date
    $scope.setCheckInDate = function(){
        const maxDateValue = maxDate.value;
        minDate.max = maxDateValue;
    }

    $scope.checkAvailability = function () {

    //Formatting check in and check out Date/Time 
    var checkInDateTime = new Date($scope.booking.checkInDate);
    var checkInTime = new Date($scope.booking.checkInTime);
    checkInDateTime.setHours(checkInTime.getHours());
    checkInDateTime.setMinutes(checkInTime.getMinutes());
    checkInDateTime.setSeconds(checkInTime.getSeconds());

    var checkOutDateTime = new Date($scope.booking.checkOutDate);
    var checkOutTime = new Date($scope.booking.checkOutTime);
    checkOutDateTime.setHours(checkOutTime.getHours());
    checkOutDateTime.setMinutes(checkOutTime.getMinutes());
    checkOutDateTime.setSeconds(checkOutTime.getSeconds());
    
    var roomTypeSelected = $scope.booking.roomType;  
    var roomSizeSelected = Number($scope.booking.roomSize);
    
    $scope.availableRooms = totalRooms;
    $scope.rooms.length = 0;
        
        for (var i = 0; i < $scope.availableRooms.length; i++) {
        
            var room = $scope.availableRooms[i];
            var roomType = room.room_type;
            var roomSize = room.room_size;
            
            if (room.booking) {
                var bookedCheckIn =  new Date(new Date(room.booking.checkIn));
                var bookedCheckOut = new Date(new Date(room.booking.checkOut));
                
                if ((checkInDateTime > bookedCheckOut || checkOutDateTime < bookedCheckIn) && roomType === roomTypeSelected && roomSize === roomSizeSelected){
                    //Adding the available room in rooms
                    room.isAvailable = true;
                    $scope.rooms.push(room);
                } else {
                    room.isAvailable = false;
                }
            }else {
                if(roomType === roomTypeSelected && roomSize === roomSizeSelected){
                    //Adding the available room in rooms
                    room.isAvailable = true;
                    $scope.rooms.push(room);
                }
            }
        }
      
        //Checking if rooms are available
        $scope.isRoomAvailable = ($scope.rooms.length > 0)? true: false;
    }
  

    $scope.checkAvailability = function () {
        var checkInDateTime = new Date($scope.booking.checkInDate + ' ' + $scope.booking.checkInTime);
        var checkOutDateTime = new Date($scope.booking.checkOutDate + ' ' + $scope.booking.checkOutTime);
        var roomTypeSelected = $scope.booking.roomType;
        var roomSizeSelected = $scope.booking.roomSize;

        if (checkInDateTime > checkOutDateTime) {
            $scope.isRoomAvailable = false;
            $scope.availableRooms = [];
            return true;
        }

        $scope.availableRooms = totalRooms;

        for (var i = 0; i < $scope.availableRooms.length; i++) {
            var room = $scope.availableRooms[i];

            if (rooms.booking) {
                var bookedCheckIn = new Date(room.booking.checkIn);
                var bookedCheckOut = new Date(room.booking.checkOut);
                var roomType = room.room_type;
                var roomSize = room.room_size;
                
                if ((checkInDateTime < bookedCheckOut && checkOutDateTime > bookedCheckIn) && (roomType == roomTypeSelected) && (roomSize == roomSizeSelected)) {
                    room.isAvailable = true;
                } else {
                    room.isAvailable = false;
                }
            } else {
                room.isAvailable = true;
            }
        }
    };
}]);
