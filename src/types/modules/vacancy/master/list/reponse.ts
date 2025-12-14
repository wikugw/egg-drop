export type VacancyMasterResponse = {
  id: number;
  title: string;
  departmentName: string;
  positionName: string;
  salaryMin: number;
  salaryMax: number;
  isActive: boolean;
  departmentId: number;
  positionId: number;
};

export type VacancyMasterListResponse = {
  data: VacancyMasterResponse[];
  page: number;
  pageLength: number;
  total: number;
};

export type VacancyMasterDetailResponse = VacancyMasterResponse & {
  description: string;
  requirements: string;
  responsibilities: string;
};
