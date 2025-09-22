import useApiManager from "@/constants/mainController";
import { useQuery } from "@tanstack/react-query";
import AxiosWithToken from "@/constants/api_management/MyHttpHelperWithToken";
import { AxiosError } from "axios";

// API Response interfaces
interface ApiResponse<TData = unknown> {
  status: boolean;
  message: string;
  data: TData;
}

interface PaginatedResponse<T> {
  status: boolean;
  message: string;
  data: {
    paginator: {
      count: number;
      page: number;
      page_size: number;
      total_pages: number;
      next_page_number?: number | null;
      next?: string | null;
      previous?: string | null;
      previous_page_number?: number | null;
    };
    results: T[];
  };
}

// Activity Memo interfaces
export interface ActivityMemo {
  id?: string;
  activity: string;
  project_area?: string;
  is_program?: boolean;
  subject: string;
  location?: string;
  requested_date: string;
  comment: string;
  activity_budget?: number;
  budget_expended?: number;
  balance?: number;
  budget_line: string[];
  cost_categories: string[];
  fconumber: string[];
  cost_input: string[];
  intervention_areas: string[];
  funding_source: string[];
  created_date?: string;
  reviewed_by?: string[];
  authorised_by?: string[];
  approved_by: string;
  created_by: string;
  through: string[];
  copy: string[];
  expenses: Array<{
    item?: string;
    quantity?: string;
    num_of_days?: string;
    unit_cost?: string;
    total_cost?: number;
  }>;
}

// Filter parameters interface
interface ActivityMemoFilterParams {
  page?: number;
  size?: number;
  search?: string;
  status?: string;
  enabled?: boolean;
}

const BASE_URL = "/procurements/purchase-request-memo/";

// ===== ACTIVITY MEMO HOOKS =====

// Get All Activity Memos (Paginated)
export const useGetAllActivityMemos = ({
  page = 1,
  size = 20,
  search = "",
  status = "",
  enabled = true,
}: ActivityMemoFilterParams = {}) => {
  return useQuery<PaginatedResponse<ActivityMemo>>({
    queryKey: ["activity-memos", page, size, search, status],
    queryFn: async () => {
      try {
        const response = await AxiosWithToken.get(BASE_URL, {
          params: {
            page,
            size,
            ...(search && { search }),
            ...(status && { status }),
          },
        });
        return response.data;
      } catch (error) {
        const axiosError = error as AxiosError;
        throw new Error("Sorry: " + (axiosError.response?.data as any)?.message);
      }
    },
    enabled: enabled,
    refetchOnWindowFocus: false,
  });
};

// Get Single Activity Memo
export const useGetActivityMemo = (id: string, enabled: boolean = true) => {
  return useQuery<ApiResponse<ActivityMemo>>({
    queryKey: ["activity-memo", id],
    queryFn: async () => {
      try {
        const response = await AxiosWithToken.get(`${BASE_URL}${id}/`);
        return response.data;
      } catch (error) {
        const axiosError = error as AxiosError;
        throw new Error("Sorry: " + (axiosError.response?.data as any)?.message);
      }
    },
    enabled: enabled && !!id,
    refetchOnWindowFocus: false,
  });
};

// Create Activity Memo
export const useCreateActivityMemo = () => {
  const { callApi, isLoading, isSuccess, error, data, response, mutation } = useApiManager<
    ActivityMemo,
    Error,
    Partial<ActivityMemo>
  >({
    endpoint: BASE_URL,
    queryKey: ["activity-memos"],
    isAuth: true,
    method: "POST",
  });

  const createActivityMemo = async (details: Partial<ActivityMemo>) => {
    try {
      return await callApi(details);
    } catch (error) {
      console.error("Activity memo create error:", error);
      throw error; // Re-throw the error so it can be caught by the component
    }
  };


  return { createActivityMemo, data, response, isLoading, isSuccess, error };
};

// Update Activity Memo
export const useUpdateActivityMemo = (id: string) => {
  const { callApi, isLoading, isSuccess, error, data } = useApiManager<
    ActivityMemo,
    Error,
    Partial<ActivityMemo>
  >({
    endpoint: `${BASE_URL}${id}/`,
    queryKey: ["activity-memos", "activity-memo"],
    isAuth: true,
    method: "PUT",
  });

  const updateActivityMemo = async (details: Partial<ActivityMemo>) => {
    try {
      await callApi(details);
    } catch (error) {
      console.error("Activity memo update error:", error);
      throw error;
    }
  };

  return { updateActivityMemo, data, isLoading, isSuccess, error };
};

// Patch Activity Memo
export const usePatchActivityMemo = (id: string) => {
  const { callApi, isLoading, isSuccess, error, data } = useApiManager<
    ActivityMemo,
    Error,
    Partial<ActivityMemo>
  >({
    endpoint: `${BASE_URL}${id}/`,
    queryKey: ["activity-memos", "activity-memo"],
    isAuth: true,
    method: "PATCH",
  });

  const patchActivityMemo = async (details: Partial<ActivityMemo>) => {
    try {
      await callApi(details);
    } catch (error) {
      console.error("Activity memo patch error:", error);
      throw error;
    }
  };

  return { patchActivityMemo, data, isLoading, isSuccess, error };
};

// Delete Activity Memo
export const useDeleteActivityMemo = (id: string) => {
  const { callApi, isLoading, isSuccess, error, data } = useApiManager<
    ActivityMemo,
    Error,
    Record<string, never>
  >({
    endpoint: `${BASE_URL}${id}/`,
    queryKey: ["activity-memos"],
    isAuth: true,
    method: "DELETE",
  });

  const deleteActivityMemo = async () => {
    try {
      await callApi({} as Record<string, never>);
    } catch (error) {
      console.error("Activity memo delete error:", error);
      throw error;
    }
  };

  return { deleteActivityMemo, data, isLoading, isSuccess, error };
};

// Legacy exports for backward compatibility
export const useCreateActivityMemoMutation = useCreateActivityMemo;
export const useGetActivityMemoQuery = useGetActivityMemo;
export const useGetAllActivityMemosQuery = useGetAllActivityMemos;
export const useUpdateActivityMemoMutation = useUpdateActivityMemo;
export const usePatchActivityMemoMutation = usePatchActivityMemo;
export const useDeleteActivityMemoMutation = useDeleteActivityMemo;