export const EnvVarEnum = {
  // PROD: process.env.NODE_ENV === 'production',
  // DEV: process.env.NODE_ENV === 'development',
  AHNI_API_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  // SESSION_TIMEOUT: process.env.NEXT_PUBLIC_SESSION_TIMEOUT,
};

export const PaginationParamsDefault = {
  offset: 0,
  limit: 20,
};

export const PaginationDefault = {
  pageIndex: 0,
  pageSize: 20,
};

export const ErrorMessages = {
  GENERIC_ERROR_MESSAGE: "Something Went wrong!",
};

export const DOCUMENT_TYPE = {
  PDF: "application/pdf",
  IMAGE: "image",
};
