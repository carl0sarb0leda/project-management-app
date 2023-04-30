import { useQuery } from "@apollo/client";
import { GetProjectsResponse } from "../../types/project";
import { ProjectCard } from "../ProjectCard/ProjectCard";
import { GET_PROJECTS } from "../../pages/api/projects/queries";

export const ProjectList = () => {
  const { loading, error, data } = useQuery<GetProjectsResponse>(GET_PROJECTS);

  if (loading) return <>loading...</>;
  if (error) return <>{error.message}</>;

  if (data?.projects.length) {
    return (
      <div className="row mt-4 w-100">
        {data.projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    );
  }
  return <>No Projects</>;
};
