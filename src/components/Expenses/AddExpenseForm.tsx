import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePlannerContext } from '@/contexts/PlannerContext';

interface ExpenseFormData {
  title: string;
  amount: string;
  category: string;
}

const AddExpenseForm: React.FC = () => {
  const { addExpense, selectedDate } = usePlannerContext();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ExpenseFormData>();

  const onSubmit = (data: ExpenseFormData) => {
    addExpense({
      title: data.title,
      amount: parseFloat(data.amount),
      category: data.category,
      date: selectedDate,
    });
    reset();
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Add New Expense</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              placeholder="Expense title"
              {...register('title', { required: 'Title is required' })}
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>
          
          <div>
            <Input
              type="number"
              step="0.01"
              placeholder="Amount"
              {...register('amount', { 
                required: 'Amount is required',
                min: { value: 0.01, message: 'Amount must be greater than 0' }
              })}
              className={errors.amount ? 'border-red-500' : ''}
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
            )}
          </div>
          
          <div>
            <Input
              placeholder="Category"
              {...register('category', { required: 'Category is required' })}
              className={errors.category ? 'border-red-500' : ''}
            />
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
            )}
          </div>
          
          <Button type="submit" className="w-full">Add Expense</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddExpenseForm;
