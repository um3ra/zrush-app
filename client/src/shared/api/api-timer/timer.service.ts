import { axiosInstanceWithAuth } from "@/shared/api/interceptors";
import type {
    IPomodoroRoundResponse,
    IPomodoroSessionResponse,
    TimerSettingsDto,
    TypePomodoroRoundState,
    TypePomodoroSessionState
} from "@/shared/api/api-timer";

class TimerService {
    private readonly BASE_URL = "/timer/";

    async getTodaySession() {
        const res = await axiosInstanceWithAuth.get<IPomodoroSessionResponse>(
            this.BASE_URL + "today"
        );
        return res.data;
    }

    async createSession() {
        const res = await axiosInstanceWithAuth.post<IPomodoroSessionResponse>(
            this.BASE_URL
        );
        return res.data;
    }

    async updateSession(sessionId: string, dto: TypePomodoroSessionState) {
        const res = await axiosInstanceWithAuth.put<IPomodoroSessionResponse>(
            this.BASE_URL + sessionId,
            dto
        );
        return res.data;
    }

    async updateRound(roundId: string, dto: TypePomodoroRoundState) {
        const res = await axiosInstanceWithAuth.put<IPomodoroRoundResponse>(
            this.BASE_URL + "round/" + roundId,
            dto
        );
        return res.data;
    }

    async deleteSession(sessionId: string) {
        const res =
            await axiosInstanceWithAuth.delete<IPomodoroSessionResponse>(
                this.BASE_URL + sessionId
            );
        return res.data;
    }

    async getTimerSettings() {
        const res = await axiosInstanceWithAuth.get<TimerSettingsDto>(
            this.BASE_URL + "settings"
        );

        return res.data;
    }

    async updateSettings(dto: TimerSettingsDto) {
        const res = await axiosInstanceWithAuth.put<TimerSettingsDto>(
            this.BASE_URL + "settings",
            dto
        );
        return res.data;
    }
}

export const timerService = new TimerService();
