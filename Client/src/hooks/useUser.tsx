import { useQuery } from "@tanstack/react-query";
import { getUserByToken } from "../services/userService";

export const useUserProfile = () => {
    return useQuery({
        queryKey: ["userProfile"],
        queryFn: () => getUserByToken(),
    });
};
