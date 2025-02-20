import { useQuery } from "@tanstack/react-query";
import { getAllProfile, getUserByToken } from "../services/userService";

export const useUserProfile = () => {
    return useQuery({
        queryKey: ["userProfile"],
        queryFn: () => getUserByToken(),
    });
};

export const useUserAllProfile = () => {
    return useQuery({
        queryKey: ["userAllProfile"],
        queryFn: () => getAllProfile(),
    });
};
