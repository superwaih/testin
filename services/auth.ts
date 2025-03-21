import { useMutation } from "@tanstack/react-query";
import { api } from "./api"


interface ILoginData {
    email: string;
    password: string;
}
const login = async (data: ILoginData) => {
    const response = await api.post("/auth/login/", data)
    return response.data
}

export const useLogin = () => {
    return useMutation({
        mutationFn: login,
        mutationKey: ['login']
    })
}