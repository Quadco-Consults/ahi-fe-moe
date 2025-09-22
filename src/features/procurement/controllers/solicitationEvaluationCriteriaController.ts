import { useQuery } from "@tanstack/react-query";
import AxiosWithToken from "@/constants/api_management/MyHttpHelperWithToken";
import { AxiosError } from "axios";
import useApiManager from "@/constants/mainController";
import {
  SolicitationCriteriaResultsData,
} from "../types/solicitation-criteria";
import { TRequest } from "definations/index";

const BASE_URL = "/procurements/solicitation-evaluation-criteria/";

// ===== SOLICITATION EVALUATION CRITERIA HOOKS =====

// Get Solicitation Criteria List (for dropdown/selection)
export const useGetSolicitationCriteriaList = ({
  enabled = true,
}: { enabled?: boolean } = {}) => {
  return useQuery<SolicitationCriteriaResultsData[]>({
    queryKey: ["solicitation-criteria-list"],
    queryFn: async () => {
      try {
        const response = await AxiosWithToken.get(BASE_URL);
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

// Create Solicitation Evaluation Criteria
export const useCreateSolicitationEvaluationCriteriaManager = () => {
  const { callApi, isLoading, isSuccess, error, data } = useApiManager<
    SolicitationCriteriaResultsData,
    Error,
    Partial<SolicitationCriteriaResultsData>
  >({
    endpoint: BASE_URL,
    queryKey: ["solicitation-criteria-list"],
    isAuth: true,
    method: "POST",
  });

  const createSolicitationCriteria = async (details: Partial<SolicitationCriteriaResultsData>) => {
    try {
      return await callApi(details);
    } catch (error) {
      throw error;
    }
  };

  return { createSolicitationCriteria, data, isLoading, isSuccess, error };
};

// Update Solicitation Evaluation Criteria
export const useUpdateSolicitationEvaluationCriteriaManager = (id: string) => {
  const { callApi, isLoading, isSuccess, error, data } = useApiManager<
    SolicitationCriteriaResultsData,
    Error,
    Partial<SolicitationCriteriaResultsData>
  >({
    endpoint: `${BASE_URL}${id}/`,
    queryKey: ["solicitation-criteria-list"],
    isAuth: true,
    method: "PUT",
  });

  const updateSolicitationCriteria = async (details: Partial<SolicitationCriteriaResultsData>) => {
    try {
      return await callApi(details);
    } catch (error) {
      throw error;
    }
  };

  return { updateSolicitationCriteria, data, isLoading, isSuccess, error };
};

// Legacy exports for backward compatibility
export const useGetSolicitationCriteriaListQuery = useGetSolicitationCriteriaList;