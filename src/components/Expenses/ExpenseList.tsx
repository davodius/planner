import React from 'react';
import { format } from 'date-fns';
import { Trash } from 'lucide-react';
import { usePlannerContext } from '@/contexts/PlannerContext';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ExpenseList: React.FC = () => {
  const { expenses, deleteExpense, selectedDate } = usePlannerContext();

  // Filter expenses for the selected date
  const filteredExpenses = expenses.filter(expense => 
    format(new Date(expense.date), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
  );

  // Calculate total expenses for the day
  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  if (filteredExpenses.length === 0) {
    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Expenses for {format(selectedDate, 'MMMM d, yyyy')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No expenses for this day.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Expenses for {format(selectedDate, 'MMMM d, yyyy')}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {filteredExpenses.map(expense => (
            <li key={expense.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">{expense.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline">{expense.category}</Badge>
                  <span className="font-semibold">${expense.amount.toFixed(2)}</span>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => deleteExpense(expense.id)}>
                <Trash className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <p className="font-medium">Total Expenses</p>
        <p className="font-bold">${totalExpenses.toFixed(2)}</p>
      </CardFooter>
    </Card>
  );
};

export default ExpenseList;
