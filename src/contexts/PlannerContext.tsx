import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Task, Expense, DailyPlannerState } from '@/types';
import { toast } from '@/components/ui/use-toast';

interface PlannerContextType {
  tasks: Task[];
  expenses: Expense[];
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  updateExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

const defaultPlannerContext: PlannerContextType = {
  tasks: [],
  expenses: [],
  addTask: () => {},
  updateTask: () => {},
  deleteTask: () => {},
  addExpense: () => {},
  updateExpense: () => {},
  deleteExpense: () => {},
  selectedDate: new Date(),
  setSelectedDate: () => {},
};

const PlannerContext = createContext<PlannerContextType>(defaultPlannerContext);

export const usePlannerContext = () => useContext(PlannerContext);

export const PlannerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<DailyPlannerState>(() => {
    const savedState = localStorage.getItem('plannerState');
    if (savedState) {
      const parsed = JSON.parse(savedState);
      return {
        tasks: parsed.tasks.map((task: any) => ({
          ...task,
          date: new Date(task.date),
        })),
        expenses: parsed.expenses.map((expense: any) => ({
          ...expense,
          date: new Date(expense.date),
        })),
      };
    }
    return { tasks: [], expenses: [] };
  });

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    localStorage.setItem('plannerState', JSON.stringify({
      tasks: state.tasks,
      expenses: state.expenses,
    }));
  }, [state]);

  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask = { ...task, id: uuidv4() };
    setState(prev => ({
      ...prev,
      tasks: [...prev.tasks, newTask],
    }));
    toast({
      title: 'Task added',
      description: `"${task.title}" has been added to your tasks.`,
    });
  };

  const updateTask = (task: Task) => {
    setState(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => (t.id === task.id ? task : t)),
    }));
  };

  const deleteTask = (id: string) => {
    setState(prev => ({
      ...prev,
      tasks: prev.tasks.filter(task => task.id !== id),
    }));
    toast({
      title: 'Task deleted',
      description: 'The task has been removed.',
    });
  };

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense = { ...expense, id: uuidv4() };
    setState(prev => ({
      ...prev,
      expenses: [...prev.expenses, newExpense],
    }));
    toast({
      title: 'Expense added',
      description: `"${expense.title}" has been added to your expenses.`,
    });
  };

  const updateExpense = (expense: Expense) => {
    setState(prev => ({
      ...prev,
      expenses: prev.expenses.map(e => (e.id === expense.id ? expense : e)),
    }));
  };

  const deleteExpense = (id: string) => {
    setState(prev => ({
      ...prev,
      expenses: prev.expenses.filter(expense => expense.id !== id),
    }));
    toast({
      title: 'Expense deleted',
      description: 'The expense has been removed.',
    });
  };

  return (
    <PlannerContext.Provider
      value={{
        tasks: state.tasks,
        expenses: state.expenses,
        addTask,
        updateTask,
        deleteTask,
        addExpense,
        updateExpense,
        deleteExpense,
        selectedDate,
        setSelectedDate,
      }}
    >
      {children}
    </PlannerContext.Provider>
  );
};
