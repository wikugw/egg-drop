export type VacancyActiveResponse = {
  id: number;
  title: string;
  departmentName: string;
  positionName: string;
  salaryMin: number;
  salaryMax: number;
  isActive: boolean;
  departmentId: number;
  positionId: number;
  startDate: Date;
  endDate: Date;
};

export type VacancyActiveListResponse = {
  data: VacancyActiveResponse[];
  page: number;
  pageLength: number;
  total: number;
};

export type VacancyMasterDetailResponse = VacancyActiveResponse & {
  description: string;
  requirements: string;
  responsibilities: string;
};
