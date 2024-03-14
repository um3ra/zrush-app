import { axiosInstanceWithAuth } from "../interceptors";
import type {
    IStatisticResponse,
    ITaskResponse,
    TypeTaskFormState
} from "./task.types";

class TaskService {
    private readonly BASE_URL = "/user/tasks/";

    async get() {
        const res = await axiosInstanceWithAuth.get<ITaskResponse[]>(
            this.BASE_URL
        );
        return res.data;
    }

    async createTask(dto: TypeTaskFormState) {
        const res = await axiosInstanceWithAuth.post<ITaskResponse>(
            this.BASE_URL,
            dto
        );
        return res.data;
    }

    async updateTask(taskId: string, dto: TypeTaskFormState) {
        const res = await axiosInstanceWithAuth.put<ITaskResponse>(
            this.BASE_URL + taskId,
            dto
        );
        return res.data;
    }

    async deleteTask(taskId: string) {
        const res = await axiosInstanceWithAuth.delete<ITaskResponse>(
            this.BASE_URL + taskId
        );
        return res.data;
    }

    async getStatistics() {
        const res = await axiosInstanceWithAuth.get<IStatisticResponse>(
            this.BASE_URL + "statistics"
        );
        return res.data;
    }
}

export const taskService = new TaskService();
