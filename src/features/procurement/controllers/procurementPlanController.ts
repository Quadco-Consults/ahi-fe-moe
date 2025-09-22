import useApiManager from "@/constants/mainController";
import { useQuery } from "@tanstack/react-query";
import AxiosWithToken from "@/constants/api_management/MyHttpHelperWithToken";
import { AxiosError } from "axios";
import { z } from "zod";
import { ProcurementPlanListSchema } from "../types/procurement-validator";
import {
  ProcurementPlanData,
  ProcurementPlanResponse,
  ProcurementPlanResultsData,
} from "../types/procurementPlan";
import { TPaginatedResponse, TRequest, TResponse } from "definations/index";

const BASE_URL = "/procurements/procurement-plans/";

// ===== PROCUREMENT PLAN HOOKS =====

// Get All Procurement Plans
export const useGetAllProcurementPlans = ({
  page = 1,
  size = 20,
  search = "",
  status = "",
  enabled = true,
}: TRequest & { enabled?: boolean }) => {
  return useQuery<TPaginatedResponse<ProcurementPlanData>>({
    queryKey: ["procurement-plans", page, size, search, status],
    queryFn: async () => {
      try {
        const response = await AxiosWithToken.get(BASE_URL, {
          params: { page, size, search, status },
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

// Get Single Procurement Plan
export const useGetSingleProcurementPlan = (
  id: string,
  enabled: boolean = true
) => {
  return useQuery<TResponse<ProcurementPlanResultsData>>({
    queryKey: ["procurement-plan", id],
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

// Create Procurement Plan (Upload endpoint)
export const useCreateProcurementPlan = () => {
  const { callApi, isLoading, isSuccess, error, data } = useApiManager<
    ProcurementPlanResponse,
    Error,
    z.infer<typeof ProcurementPlanListSchema>
  >({
    endpoint: `${BASE_URL}upload/`,
    queryKey: ["procurement-plans"],
    isAuth: true,
    method: "POST",
    contentType: null,
  });

  const createProcurementPlan = async (
    details: z.infer<typeof ProcurementPlanListSchema>
  ) => {
    try {
      await callApi(details);
    } catch (error) {
      console.error("Procurement plan create error:", error);
      throw error; // Re-throw the error so it can be caught by the component
    }
  };

  return { createProcurementPlan, data, isLoading, isSuccess, error };
};

// Update Procurement Plan (Full Update)
export const useUpdateProcurementPlan = (id: string) => {
  const { callApi, isLoading, isSuccess, error, data } = useApiManager<
    ProcurementPlanResponse,
    Error,
    any
  >({
    endpoint: `${BASE_URL}${id}/`,
    queryKey: ["procurement-plans", "procurement-plan"],
    isAuth: true,
    method: "PUT",
  });

  const updateProcurementPlan = async (details: any) => {
    try {
      await callApi(details);
    } catch (error) {
      console.error("Procurement plan update error:", error);
    }
  };

  return { updateProcurementPlan, data, isLoading, isSuccess, error };
};

// Modify Procurement Plan (Partial Update)
export const useModifyProcurementPlan = (id: string) => {
  const { callApi, isLoading, isSuccess, error, data } = useApiManager<
    ProcurementPlanResponse,
    Error,
    any
  >({
    endpoint: `${BASE_URL}${id}/`,
    queryKey: ["procurement-plans", "procurement-plan"],
    isAuth: true,
    method: "PATCH",
  });

  const modifyProcurementPlan = async (details: any) => {
    try {
      await callApi(details);
    } catch (error) {
      console.error("Procurement plan modify error:", error);
    }
  };

  return { modifyProcurementPlan, data, isLoading, isSuccess, error };
};

// Delete Procurement Plan
export const useDeleteProcurementPlan = (id: string) => {
  const { callApi, isLoading, isSuccess, error, data } = useApiManager<
    void,
    Error,
    Record<string, never>
  >({
    endpoint: `${BASE_URL}${id}/`,
    queryKey: ["procurement-plans"],
    isAuth: true,
    method: "DELETE",
  });

  const deleteProcurementPlan = async () => {
    try {
      await callApi({} as Record<string, never>);
    } catch (error) {
      console.error("Procurement plan delete error:", error);
    }
  };

  return { deleteProcurementPlan, data, isLoading, isSuccess, error };
};

// Download Procurement Plan Template
export const useDownloadProcurementPlanTemplate = () => {
  const downloadTemplate = async () => {
    try {
      const response = await AxiosWithToken.get(`${BASE_URL}template/`, {
        responseType: 'blob', // Important for file downloads
      });

      // Create blob link to download
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'procurement_plan_template.xlsx';
      document.body.appendChild(link);
      link.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);

      return { success: true, message: 'Template downloaded successfully' };
    } catch (error) {
      const axiosError = error as AxiosError;
      throw new Error("Download failed: " + (axiosError.response?.data as any)?.message || axiosError.message);
    }
  };

  return { downloadTemplate };
};

// Legacy exports for backward compatibility
export const useGetProcurementPlansQuery = useGetAllProcurementPlans;
export const useGetProcurementPlanQuery = useGetSingleProcurementPlan;
export const useCreateProcurementPlanMutation = useCreateProcurementPlan;
export const useUpdateProcurementPlanMutation = useUpdateProcurementPlan;
export const useModifyProcurementPlanMutation = useModifyProcurementPlan;
export const useDeleteProcurementPlanMutation = useDeleteProcurementPlan;

// Default export for backward compatibility
const ProcurementPlanAPI = {
  useGetAllProcurementPlans,
  useGetSingleProcurementPlan,
  useCreateProcurementPlan,
  useUpdateProcurementPlan,
  useModifyProcurementPlan,
  useDeleteProcurementPlan,
  useDownloadProcurementPlanTemplate,
  useGetProcurementPlansQuery,
  useGetProcurementPlanQuery,
  useCreateProcurementPlanMutation,
  useUpdateProcurementPlanMutation,
  useModifyProcurementPlanMutation,
  useDeleteProcurementPlanMutation,
};

export default ProcurementPlanAPI;