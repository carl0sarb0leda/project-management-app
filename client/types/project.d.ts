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

export type GetProjectResponse = {
  project: ProjectData;
};

export type AddProjectResponse = {
  addProject: ProjectData;
};
