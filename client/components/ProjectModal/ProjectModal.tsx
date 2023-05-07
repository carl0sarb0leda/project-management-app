import { useRef, useState } from "react";
import { FaList } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { ADD_PROJECT } from "../../pages/api/projects/mutations";
import { GET_PROJECTS } from "../../pages/api/projects/queries";
import { ClientData } from "../../types/client";
import { AddProjectResponse, GetProjectsResponse } from "../../types/project";

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
  clientsData: ClientData[];
}

export const ProjectModal = ({ clientsData }: ProjectModalProps) => {
  const [showModal, setShowModal] = useState(false);
  const formRef = useRef<ProjectFormElement>(null);

  const [addProject] = useMutation<AddProjectResponse>(ADD_PROJECT);

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
      clientId: event.currentTarget.elements.clientId.value,
    };

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

    handleClose();
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setShowModal(true)}
        disabled={!clientsData.length}
      >
        <div className="d-flex align-items-center">
          <FaList className="icon" />
          <div>New Project</div>
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
                New Project
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
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select id="status" className="form-select">
                    <option value="new">Not Started</option>
                    <option value="progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Client</label>
                  <select id="clientId" className="form-select" required>
                    <option value="">Select Client</option>
                    {clientsData.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
