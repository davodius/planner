import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { usePlannerContext } from '@/contexts/PlannerContext';
import { format } from 'date-fns';

const CalendarView: React.FC = () => {
  const { selectedDate, setSelectedDate, tasks, expenses } = usePlannerContext();

  // Function to check if a date has tasks or expenses
  const hasItemsOnDate = (date: Date) => {
    const dateString = format(date, 'yyyy-MM-dd');
    
    const hasTask = tasks.some(task => 
      format(new Date(task.date), 'yyyy-MM-dd') === dateString
    );
    
    const hasExpense = expenses.some(expense => 
      format(new Date(expense.date), 'yyyy-MM-dd') === dateString
    );
    
    return hasTask || hasExpense;
  };

  return (
    <Card className="shadow-md">
      <CardContent className="pt-6">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => date && setSelectedDate(date)}
          className="rounded-md border"
          modifiers={{
            hasItems: (date) => hasItemsOnDate(date),
          }}
          modifiersClassNames={{
            hasItems: 'bg-blue-100 font-bold text-blue-600',
          }}
        />
      </CardContent>
    </Card>
  );
};

export default CalendarView;
