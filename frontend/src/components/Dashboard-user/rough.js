{
                attendanceStatus === "Completed" ? (
                  <p className="text-green-600 font-bold">✅ Attendance marked</p>
                ) : !isClockedIn ? (
                  <button
                    onClick={handleClockIn}
                    className="mt-2 px-4 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                  >
                    Clock In
                  </button>
                ) : (
                  <button
                    onClick={handleClockOut}
                    className="mt-2 px-4 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded-md"
                  >
                    Clock Out
                  </button>
                )
 }

 if(!isClockedIn && !isClockedOut){
    // clock in btn
 }
 else if(isClockedIn && !isClockedOut){
    // clock out btn
 }
 else if(isClockedIn && isClockedOut){
    // no buttons
 }