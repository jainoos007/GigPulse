import { useState, useCallback, useEffect } from "react";
import { TaskService } from "../services/task.service";
import { KanbanBoard, TaskStatus } from "../types/task.types";
import { TaskSchemaType } from "../schemas/task.schema";

export const useTasks = (projectId?: string) => {
  const [board, setBoard] = useState<KanbanBoard>({
    TODO: [],
    IN_PROGRESS: [],
    REVIEW: [],
    COMPLETED: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBoard = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await TaskService.getKanbanBoard(projectId);
      setBoard(data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch tasks board");
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchBoard();
  }, [fetchBoard]);

  const addTask = async (data: TaskSchemaType) => {
    await TaskService.createTask(data);
    await fetchBoard();
  };

  const moveTaskStage = async (id: string, status: TaskStatus) => {
    await TaskService.updateTask(id, { status });
    await fetchBoard();
  };

  const removeTask = async (id: string) => {
    await TaskService.deleteTask(id);
    await fetchBoard();
  };

  return {
    board,
    isLoading,
    error,
    addTask,
    moveTaskStage,
    removeTask,
    refresh: fetchBoard,
  };
};
