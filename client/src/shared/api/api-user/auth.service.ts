import { axiosInstance } from "../interceptors";
import { removeFromStorage, saveTokenStorage } from "./token-storage";
import { IAuthResponse, LoginDto, RegisterDto } from "./user.types";

class AuthService {
    private BASE_URL = "/auth/";

    async login(dto: LoginDto) {
        const response = await axiosInstance.post<IAuthResponse>(
            this.BASE_URL + "login",
            dto
        );
        if (response.data.accessToken)
            saveTokenStorage(response.data.accessToken);
        return response;
    }

    async register(dto: RegisterDto) {
        const response = await axiosInstance.post<IAuthResponse>(
            this.BASE_URL + "register",
            dto
        );
        if (response.data.accessToken)
            saveTokenStorage(response.data.accessToken);
        return response;
    }

    async getNewTokens() {
        const response = await axiosInstance.get<IAuthResponse>(
            this.BASE_URL + "refresh-tokens"
        );
        if (response.data.accessToken)
            saveTokenStorage(response.data.accessToken);
        return response;
    }

    async logout() {
        const response = await axiosInstance.delete<boolean>(
            this.BASE_URL + "logout"
        );

        if (response.data) removeFromStorage();

        return response.data;
    }
}

export const authService = new AuthService();
