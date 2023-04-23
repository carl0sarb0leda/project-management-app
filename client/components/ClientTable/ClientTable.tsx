import React from "react";
import { FaTrash } from "react-icons/fa";

interface ClientTableProps {
  clientData: {
    id: string;
    name: string;
    email: string;
    phone: string;
  }[];
  onClickDelete: (clientId: string) => void;
}

export const ClientTable = ({
  clientData,
  onClickDelete,
}: ClientTableProps) => {
  return (
    <table
      style={{
        border: "0.1rem white solid",
        borderRadius: "0.5rem",
        borderSpacing: "1rem",
      }}
    >
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
                    style={{ backgroundColor: "tomato", cursor: "pointer" }}
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
