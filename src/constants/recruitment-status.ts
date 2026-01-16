export const APPLICATION_STATUS = {
  SUBMITTED: "SUBMITTED",
  IN_REVIEW: "IN_REVIEW",
  INTERVIEW: "INTERVIEW",
  REJECTED: "REJECTED",
  HIRED: "HIRED",
} as const;

export type ApplicationStatus =
  (typeof APPLICATION_STATUS)[keyof typeof APPLICATION_STATUS];
