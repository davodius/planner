import React from "react";
import { usePlannerContext } from "@/contexts/PlannerContext";
import CalendarView from "./Calendar/CalendarView";
import TaskList from "./Tasks/TaskList";
import AddTaskForm from "./Tasks/AddTaskForm";
import ExpenseList from "./Expenses/ExpenseList";
import AddExpenseForm from "./Expenses/AddExpenseForm";

const DailyPlanner: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">DailyPlanner</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <CalendarView />
        </div>

        <div className="md:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <TaskList />
              <AddTaskForm />
            </div>
            <div>
              <ExpenseList />
              <AddExpenseForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyPlanner;
