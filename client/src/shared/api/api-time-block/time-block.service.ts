import { axiosInstanceWithAuth } from "../interceptors";
import { ITimeBlockResponse, TypeTimeBlockFormState } from "./time-block.types";

class TimeBlockService {
    private readonly BASE_URL = "/time-block";

    async get() {
        const res = await axiosInstanceWithAuth.get<ITimeBlockResponse[]>(
            this.BASE_URL
        );

        return res.data;
    }

    async create(dto: TypeTimeBlockFormState) {
        const res = await axiosInstanceWithAuth.post<ITimeBlockResponse>(
            this.BASE_URL,
            dto
        );
        return res.data;
    }

    async update(timeBlockId: string, dto: TypeTimeBlockFormState) {
        const res = await axiosInstanceWithAuth.put<ITimeBlockResponse>(
            this.BASE_URL + "/" + timeBlockId,
            dto
        );
        return res.data;
    }

    async delete(timeBlockId: string) {
        const res = await axiosInstanceWithAuth.delete<ITimeBlockResponse>(
            this.BASE_URL + "/" + timeBlockId
        );
        return res.data;
    }

    async updateOrder(dto: { ids: string[] }) {
        const res = await axiosInstanceWithAuth.put(
            this.BASE_URL + "/order",
            dto
        );

        return res;
    }
}

export const timeBlockService = new TimeBlockService();
