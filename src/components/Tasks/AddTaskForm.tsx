import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePlannerContext } from '@/contexts/PlannerContext';

interface TaskFormData {
  title: string;
  description: string;
}

const AddTaskForm: React.FC = () => {
  const { addTask, selectedDate } = usePlannerContext();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TaskFormData>();

  const onSubmit = (data: TaskFormData) => {
    addTask({
      title: data.title,
      description: data.description || undefined,
      date: selectedDate,
      completed: false,
    });
    reset();
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Add New Task</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              placeholder="Task title"
              {...register('title', { required: 'Title is required' })}
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>
          
          <div>
            <Textarea
              placeholder="Description (optional)"
              {...register('description')}
              className="resize-none"
            />
          </div>
          
          <Button type="submit" className="w-full">Add Task</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddTaskForm;
