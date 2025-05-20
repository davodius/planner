export interface Task {
  id: string;
  title: string;
  description?: string;
  date: Date;
  completed: boolean;
}

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: Date;
}

export interface DailyPlannerState {
  tasks: Task[];
  expenses: Expense[];
}
