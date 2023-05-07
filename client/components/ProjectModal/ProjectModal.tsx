import { useEffect, useMemo, useRef, useState } from "react";
import { FaList } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { GetClientsResponse } from "../../types/client";
import { GET_CLIENTS } from "../../pages/api/clients/queries";
import { GET_PROJECT, GET_PROJECTS } from "../../pages/api/projects/queries";
import {
  ADD_PROJECT,
  UPDATE_PROJECT,
} from "../../pages/api/projects/mutations";
import {
  AddProjectResponse,
  GetProjectResponse,
  GetProjectsResponse,
  ProjectData,
} from "../../types/project";

interface ProjectElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  description: HTMLTextAreaElement;
  status: HTMLSelectElement;
  clientId: HTMLSelectElement;
}
interface ProjectFormElement extends HTMLFormElement {
  readonly elements: ProjectElements;
}

interface ProjectModalProps {
  project?: ProjectData;
  editMode?: boolean;
}

export const ProjectModal = ({ project, editMode }: ProjectModalProps) => {
  const [showModal, setShowModal] = useState(false);
  const selectRef = useRef<HTMLSelectElement>(null);
  const formRef = useRef<ProjectFormElement>(null);

  //Get Clients
  const { error: clientsError, data: clientsData } =
    useQuery<GetClientsResponse>(GET_CLIENTS);
  //New Project
  const [addProject] = useMutation<AddProjectResponse>(ADD_PROJECT);
  //Update Project
  const [updateProject] = useMutation(UPDATE_PROJECT);

  //Parse status
  const projectStatus = useMemo(() => {
    switch (project?.status) {
      case "In Progress":
        return "progress";
      case "Not Started":
        return "new";
      case "Completed":
        return "completed";
      default:
        return "invalid status";
    }
  }, [project?.status]);

  const handleClose = () => {
    formRef.current?.reset();
    setShowModal(false);
  };

  const handleSubmit = (event: React.FormEvent<ProjectFormElement>) => {
    event.preventDefault();
    const formData = {
      name: event.currentTarget.elements.name.value,
      description: event.currentTarget.elements.description.value,
      status: event.currentTarget.elements.status.value,
      clientId: event.currentTarget.elements.clientId?.value,
    };

    if (editMode) {
      const { clientId, ...updatedData } = formData;
      updateProject({
        variables: { id: project?.id, ...updatedData },
        update: (cache, { data: responseData }) => {
          const { project: cachedProject } =
            cache.readQuery<GetProjectResponse>({
              query: GET_PROJECT,
            }) ?? {};
          if (cachedProject && responseData) {
            //rewrite the cache with the updated values
            cache.writeQuery({
              query: GET_PROJECT,
              data: { project: responseData.project },
            });
          }
        },
        onError: (error) => {
          alert(error.message);
        },
      });
    } else {
      addProject({
        variables: formData,
        update: (cache, { data: responseData }) => {
          const { projects: cachedProjects } =
            cache.readQuery<GetProjectsResponse>({
              query: GET_PROJECTS,
            }) ?? {};
          if (cachedProjects && responseData) {
            //rewrite the cache with the updated values
            cache.writeQuery({
              query: GET_PROJECTS,
              data: { projects: [...cachedProjects, responseData.addProject] },
            });
          }
        },
        onError: (error) => {
          alert(error.message);
        },
      });
    }
    handleClose();
  };

  useEffect(() => {
    /**
     * The defaultValue of the select element is only set once,
     * when the component is mounted, and it does not update when
     * the value of projectStatus changes. So useEffect trigger
     * the change to keep it updated it from project
     */
    if (showModal && selectRef.current) {
      selectRef.current.value = projectStatus;
    }
  }, [showModal, projectStatus]);

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setShowModal(true)}
        disabled={!clientsData?.clients.length || !!clientsError}
      >
        <div className="d-flex align-items-center">
          <FaList className="icon" />
          <div>{editMode ? "Edit" : "New"} Project</div>
        </div>
      </button>

      <div
        className={`modal fade${showModal ? " show" : ""}`}
        aria-labelledby="addProjectModalLabel"
        aria-hidden={!showModal}
        style={{ color: "black", display: showModal ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addProjectModalLabel">
                Project
              </h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit} ref={formRef}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    required
                    defaultValue={project?.name}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    required
                    defaultValue={project?.description}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select id="status" className="form-select" ref={selectRef}>
                    <option value="new">Not Started</option>
                    <option value="progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                {!editMode && (
                  <div className="mb-3">
                    <label className="form-label">Client</label>
                    <select id="clientId" className="form-select" required>
                      <option value="">Select Client</option>
                      {clientsData?.clients.map((client) => (
                        <option key={client.id} value={client.id}>
                          {client.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <button type="submit" className="btn btn-primary">
                  {editMode ? "Update" : "Submit"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
