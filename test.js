/**
 * 
 */
function runUnitTesting(){
	

	QUnit.test( "hotel test", function( assert ) {
	  assert.ok( 1 == "1", "Unit testing working!" );
	  assert.ok(searchRooms(3)[0].type==="Executive","Try book for 3 people. " +
	  		"Party of 3 ppl should take a executive room");
	  var total20Capacity = getRoomsTotalCapacity( searchRooms(20));
	  assert.ok( total20Capacity>=20, 
			  "Try book for 20 people. Total rooms booked capacity is " 
			  +total20Capacity +" which can fulfill the required size of 20");
	  $('#partySize').val(20);
	  tryBooking();
	  var roomsFor20 = searchRooms(20);
	  confirmBookings();
	  for (var i=0;i<roomsFor20.length;i++){
		  var roomNumber = roomsFor20[i].number;
		  $('#roomNumberInput').val(roomNumber);
		  assert.ok( checkAvailablity()===false,"Room "+roomNumber+" successfully booked");
	  }
	  
	  var reservationsLocal = getReservations();
	  var reservationToBeDeleted = reservationsLocal[0];
	  cancelBooking (reservationsLocal.indexOf(reservationToBeDeleted));
	  var reservationsLocalAfter = getReservations();
	  var resultText = '';
	  if(!reservationToBeDeleted){
		  resultText = 'no reservation made yet';
	  } else {
		  resultText = 'Reservation cancelled successfully';
	  }
	  assert.ok(!reservationToBeDeleted||(reservationsLocalAfter.indexOf(reservationToBeDeleted)=== -1),
			  resultText);
	  var roomUnbookedNumbers = reservationToBeDeleted.roomNumbers;
	  for (var i=0;i<roomUnbookedNumbers.length;i++){
		  var roomNumber = roomUnbookedNumbers[i];
		  $('#roomNumberInput').val(roomNumber);
		  assert.ok( checkAvailablity()===true,"Room "+roomNumber+" successfully unbooked");
	  }
	});
}