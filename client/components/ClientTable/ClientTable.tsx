import React from "react";
import { FaTrash } from "react-icons/fa";
import { ClientData } from "../../types/client";

interface ClientTableProps {
  clientData: ClientData[];
  onClickDelete: (clientId: string) => void;
}

export const ClientTable = ({
  clientData,
  onClickDelete,
}: ClientTableProps) => {
  return (
    <table className="table table-dark table-striped mt-3">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(clientData) &&
          clientData.map((client) => {
            return (
              <tr key={client.id}>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.phone}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onClickDelete(client.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};
