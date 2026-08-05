import { useState, useCallback, useEffect } from "react";
import { ProjectService } from "../services/project.service";
import { Project, ProjectMeta } from "../types/project.types";
import { ProjectSchemaType } from "../schemas/project.schema";

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [meta, setMeta] = useState<ProjectMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [priorityFilter, setPriorityFilter] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await ProjectService.getProjects({
        search,
        status: statusFilter || undefined,
        priority: priorityFilter || undefined,
      });
      setProjects(res.data);
      setMeta(res.meta);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch projects");
    } finally {
      setIsLoading(false);
    }
  }, [search, statusFilter, priorityFilter]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const addProject = async (data: ProjectSchemaType) => {
    await ProjectService.createProject(data);
    await fetchProjects();
  };

  const updateProject = async (id: string, data: Partial<ProjectSchemaType>) => {
    await ProjectService.updateProject(id, data);
    await fetchProjects();
  };

  const removeProject = async (id: string) => {
    await ProjectService.deleteProject(id);
    await fetchProjects();
  };

  return {
    projects,
    meta,
    isLoading,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    error,
    addProject,
    updateProject,
    removeProject,
    refresh: fetchProjects,
  };
};
