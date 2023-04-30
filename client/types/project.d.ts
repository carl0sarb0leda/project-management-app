export type ProjectData = {
  id: string;
  name: string;
  description: string;
  status: string;
  clientId: string;
};

export type GetProjectsResponse = {
  projects: ProjectData[];
};
