import Link from "next/link";
import { ProjectData } from "../../types/project";
import { Status } from "../Status/Status";

interface ProjectCardProps {
  project: ProjectData;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="col-md-6" style={{ color: "black" }}>
      <div className="card mb-3">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title">{project.name}</h5>
            <Link className="btn btn-info" href={`/project/${project.id}`}>
              View
            </Link>
          </div>
          <div className="small d-flex align-items-center gap-1">
            Status:
            <Status status={project.status} />
          </div>
        </div>
      </div>
    </div>
  );
};
