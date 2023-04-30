import { useRef, useState } from "react";
import { FaUser } from "react-icons/fa";
import { ClientFormData } from "../../types/client";

interface ClientElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  email: HTMLInputElement;
  phone: HTMLInputElement;
}
interface ClientFormElement extends HTMLFormElement {
  readonly elements: ClientElements;
}

interface AddClientModalProps {
  onSubmit: (formData: ClientFormData) => void;
}
export const AddClientModal = ({ onSubmit }: AddClientModalProps) => {
  const [showModal, setShowModal] = useState(false);
  const formRef = useRef<ClientFormElement>(null);

  const handleClose = () => {
    formRef.current?.reset();
    setShowModal(false);
  };

  const handleSubmit = (event: React.FormEvent<ClientFormElement>) => {
    event.preventDefault();
    const formData = {
      name: event.currentTarget.elements.name.value,
      email: event.currentTarget.elements.email.value,
      phone: event.currentTarget.elements.phone.value,
    };
    onSubmit(formData);
    handleClose();
  };

  return (
    <>
      {/* Modal trigger */}
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setShowModal(true)}
      >
        <div className="d-flex align-items-center">
          <FaUser className="icon" />
          <div>Add Client</div>
        </div>
      </button>
      {/* Modal */}
      <div
        className={`modal fade${showModal ? " show" : ""}`}
        aria-labelledby="addClientModalLabel"
        aria-hidden={!showModal}
        style={{ color: "black", display: showModal ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addClientModalLabel">
                Add Client
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
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-secondary">
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
