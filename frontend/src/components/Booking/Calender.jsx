// components/Calendar.jsx
import React, { useState } from 'react';

const Calendar = ({ 
  selectedDate,
  onDateSelect,
  bookedDates,
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

  const isDateBooked = (date) => {
    return bookedDates.some(bookedDate => 
      new Date(bookedDate.start) <= date && 
      new Date(bookedDate.end) >= date
    );
  };

  const isDateSelectable = (date) => {
    if (date < minDate) return false;
    if (maxDate && date > maxDate) return false;
    return !isDateBooked(date);
  };

  return (
    <div className="p-2">
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}
          className="p-1 hover:bg-gray-100 rounded"
        >
          ←
        </button>
        <h3 className="text-sm font-medium">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}
          className="p-1 hover:bg-gray-100 rounded"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center mb-1">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
          <div key={day} className="text-gray-500 text-xs">
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
          const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
          const isSelectable = isDateSelectable(date);

          return (
            <button
              key={index}
              onClick={() => isSelectable && onDateSelect(date)}
              disabled={!isSelectable}
              className={`
                p-1 rounded-full text-xs
                ${isSelected ? 'bg-blue-500 text-white' : ''}
                ${isBooked ? 'bg-red-50 text-red-400 cursor-not-allowed' : ''}
                ${!isSelectable && !isBooked ? 'text-gray-300 cursor-not-allowed' : ''}
                ${isSelectable && !isSelected ? 'hover:bg-gray-100' : ''}
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