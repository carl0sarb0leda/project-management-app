export type ClientData = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

export type ClientFormData = Omit<ClientData, "id">;

export type DeleteClientResponse = {
  deleteClient: ClientData;
};

export type AddClientResponse = {
  addClient: ClientData;
};

export type GetClientsResponse = {
  clients: ClientData[];
};
