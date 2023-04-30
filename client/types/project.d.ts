import { ClientData } from "./client";

export type ProjectData = {
  id: string;
  name: string;
  description: string;
  status: string;
  client: ClientData;
};

export type GetProjectsResponse = {
  projects: ProjectData[];
};
