import React from 'react';
import { format } from 'date-fns';
import { Check, Edit, Trash } from 'lucide-react';
import { usePlannerContext } from '@/contexts/PlannerContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Task } from '@/types';

const TaskList: React.FC = () => {
  const { tasks, updateTask, deleteTask, selectedDate } = usePlannerContext();

  // Filter tasks for the selected date
  const filteredTasks = tasks.filter(task => 
    format(new Date(task.date), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
  );

  const handleToggleComplete = (task: Task) => {
    updateTask({
      ...task,
      completed: !task.completed
    });
  };

  if (filteredTasks.length === 0) {
    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Tasks for {format(selectedDate, 'MMMM d, yyyy')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No tasks for this day.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Tasks for {format(selectedDate, 'MMMM d, yyyy')}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {filteredTasks.map(task => (
            <li key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Checkbox 
                  checked={task.completed} 
                  onCheckedChange={() => handleToggleComplete(task)}
                  id={`task-${task.id}`}
                />
                <div className={`${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                  <p className="font-medium">{task.title}</p>
                  {task.description && (
                    <p className="text-sm text-muted-foreground">{task.description}</p>
                  )}
                </div>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" onClick={() => deleteTask(task.id)}>
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default TaskList;
