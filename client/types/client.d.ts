export type ClientData = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

export type DeleteClientResponse = {
  deleteClient: ClientData;
};

export type GetClientsResponse = {
  clients: ClientData[];
};
