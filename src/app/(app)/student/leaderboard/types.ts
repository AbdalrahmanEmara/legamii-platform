export interface LeaderboardStudent {
  rank: number;
  student_id: string;
  first_name: string;
  last_name: string;
  avatar_url: string | null;
  points: number;
  level: number;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface AuthenticatedStudent {
  rank: number;
  points: number;
  level: number;
}

export interface LeaderboardResponse {
  leaderboard: LeaderboardStudent[];
  pagination: Pagination;
  authenticated_student: AuthenticatedStudent | null;
}