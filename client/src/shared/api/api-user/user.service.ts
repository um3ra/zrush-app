import { axiosInstanceWithAuth } from "../interceptors";
import { IUser, TypeUserForm } from "./user.types";

class UserService {
    private BASE_URL = "/user/profile";

    async getProfile() {
        const response = await axiosInstanceWithAuth.get<IUser>(this.BASE_URL);
        return response.data;
    }

    async update(data: TypeUserForm) {
        const response = await axiosInstanceWithAuth.put(this.BASE_URL, data);
        return response.data;
    }
}

export const userService = new UserService();
