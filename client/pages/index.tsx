import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useQuery, useMutation } from "@apollo/client";
import { ClientTable } from "../components";
import { GET_CLIENTS } from "./api/clients/queries";
import { DELETE_CLIENT } from "./api/clients/mutations";
import { DeleteClientResponse, GetClientsResponse } from "../types/client";

export default function Home() {
  const {
    loading: clientsLoading,
    error: clientsError,
    data: clientsData,
  } = useQuery<GetClientsResponse>(GET_CLIENTS);
  const [deleteClient, { error: deleteError }] =
    useMutation<DeleteClientResponse>(DELETE_CLIENT);

  if (deleteError) {
    alert(deleteError.message);
  }

  const handleDeleteClient = (clientId: string) => {
    deleteClient({
      variables: { id: clientId },
      // After delete the item we can query again clients to display the changes
      // refetchQueries: [{ query: GET_CLIENTS }, { query: GET_CLIENTS }],
      // Another approach to avoid query again is rewrite the cache manually
      update: (cache, { data }) => {
        //use the nullish coalescing operator to provide an
        //empty object as a fallback if the response object is null
        const { clients: cachedClients } =
          cache.readQuery<GetClientsResponse>({
            query: GET_CLIENTS,
          }) ?? {};
        //after we took the cached clients we compare with the response from delete (data)
        if (data) {
          const updatedClients = cachedClients?.filter(
            (client) => client.id !== data.deleteClient.id
          );
          //then we rewrite the cache with the updated values
          cache.writeQuery({
            query: GET_CLIENTS,
            data: { clients: updatedClients },
          });
        }
      },
    });
  };

  if (clientsLoading) {
    return <>loading...</>;
  }
  if (clientsError) {
    return <>{clientsError.message}</>;
  }
  if (clientsData) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Project Management App</title>
        </Head>
        <main className={styles.main}>
          <ClientTable
            clientData={clientsData.clients}
            onClickDelete={handleDeleteClient}
          />
        </main>
        <footer className={styles.footer}>v1.0.0 - ©carl0sarb0leda</footer>
      </div>
    );
  }
  return null;
}
