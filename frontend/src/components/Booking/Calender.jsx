import React, { useState } from 'react';

const Calendar = ({ 
  selectedDate,
  onDateSelect,
  bookedDates = [],
  minDate = new Date(),
  maxDate = null
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // Modified to check if date is in bookedDates array
  const isDateBooked = (date) => {
    return bookedDates.some(bookedDate => 
      new Date(bookedDate).toDateString() === date.toDateString()
    );
  };

  const isDateSelectable = (date) => {
    // Convert to start of day for comparison
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    
    const compareMinDate = new Date(minDate);
    compareMinDate.setHours(0, 0, 0, 0);
    
    if (compareDate < compareMinDate) return false;
    
    if (maxDate) {
      const compareMaxDate = new Date(maxDate);
      compareMaxDate.setHours(0, 0, 0, 0);
      if (compareDate > compareMaxDate) return false;
    }
    
    return !isDateBooked(date);
  };

  // Helper to check if a date is today
  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  // Handle month navigation
  const handleMonthChange = (increment) => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + increment)));
  };

  return (
    <div className="p-2 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={() => handleMonthChange(-1)}
          className="p-1 hover:bg-gray-100 rounded text-gray-600"
          type="button"
        >
          ←
        </button>
        <h3 className="text-sm font-medium">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <button
          onClick={() => handleMonthChange(1)}
          className="p-1 hover:bg-gray-100 rounded text-gray-600"
          type="button"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center mb-1">
        {['S', 'M', 'T', 'W', 'Th', 'F', 'Sa'].map(day => (
          <div key={day} className="text-gray-500 text-xs font-medium">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array(firstDayOfMonth).fill(null).map((_, index) => (
          <div key={`empty-${index}`} />
        ))}
        
        {Array(daysInMonth).fill(null).map((_, index) => {
          const date = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            index + 1
          );
          
          const isBooked = isDateBooked(date);
          const isSelected = selectedDate && 
            date.toDateString() === new Date(selectedDate).toDateString();
          const selectable = isDateSelectable(date);
          const today = isToday(date);

          return (
            <button
              key={index}
              onClick={() => selectable && onDateSelect(date)}
              disabled={!selectable}
              type="button"
              className={`
                p-1 w-full aspect-square rounded-full text-xs
                transition-colors duration-200
                ${isSelected ? 'bg-blue-500 text-white hover:bg-blue-600' : ''}
                ${isBooked ? 'bg-red-50 text-red-400 cursor-not-allowed' : ''}
                ${!selectable && !isBooked ? 'text-gray-300 cursor-not-allowed' : ''}
                ${selectable && !isSelected ? 'hover:bg-gray-100' : ''}
                ${today && !isSelected ? 'border border-blue-500 text-blue-500' : ''}
              `}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;