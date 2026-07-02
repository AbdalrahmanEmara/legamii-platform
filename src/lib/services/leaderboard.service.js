import "server-only";
import { api } from "../api/client";
import { ENDPOINTS } from "../api/endPoints";

export const getGlobalLeaderboard = (page = 1, limit = 100) => {
    return api.get(ENDPOINTS.leaderboard.global, {
        params: {
            page,
            limit,
        },
    });
};