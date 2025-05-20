import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { usePlannerContext } from "@/contexts/PlannerContext";
import { format } from "date-fns";
const CalendarView: React.FC = () => {
  // Destructure values from the PlannerContext: selected date, setter function, task list, and expense list
  const { selectedDate, setSelectedDate, tasks, expenses } =
    usePlannerContext();

  // Function to check if a given date has any tasks or expenses
  const hasItemsOnDate = (date: Date) => {
    const dateString = format(date, "yyyy-MM-dd"); // Format the date to match stored data

    // Check if any task matches the date
    const hasTask = tasks.some(
      (task) => format(new Date(task.date), "yyyy-MM-dd") === dateString
    );

    // Check if any expense matches the date
    const hasExpense = expenses.some(
      (expense) => format(new Date(expense.date), "yyyy-MM-dd") === dateString
    );

    // Return true if either a task or expense exists on that date
    return hasTask || hasExpense;
  };

  return (
    <Card className="shadow-md">
      {" "}
      {/* Card wrapper for layout and shadow styling */}
      <CardContent className="pt-6">
        {" "}
        {/* Inner card content with top padding */}
        <Calendar
          mode="single" // Allow selection of a single date
          selected={selectedDate} // Currently selected date from context
          onSelect={(date) => date && setSelectedDate(date)} // Update selected date when a new date is clicked
          className="rounded-md border" // Calendar styling: rounded corners and border
          modifiers={{
            hasItems: (date) => hasItemsOnDate(date), // Custom modifier for dates with items
          }}
          modifiersClassNames={{
            hasItems: "bg-blue-100 font-bold text-blue-600", // Styling for highlighted dates
          }}
        />
      </CardContent>
    </Card>
  );
};

export default CalendarView;
