import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useQuery } from "@apollo/client";
import { ClientTable } from "../components";
import { GET_CLIENTS } from "./api/clients";

export default function Home() {
  const { loading, error, data: clientData } = useQuery(GET_CLIENTS);

  const handleDeleteClient = (clientId: string) => {
    console.log("🍄", clientId);
  };

  if (loading) {
    return <>loading...</>;
  }
  if (error) {
    return <>{error.message}</>;
  }
  if (clientData) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Project Management App</title>
        </Head>
        <main className={styles.main}>
          <ClientTable
            clientData={clientData.clients}
            onClickDelete={handleDeleteClient}
          />
        </main>
        <footer className={styles.footer}>v1.0.0 - ©carl0sarb0leda</footer>
      </div>
    );
  }
  return null;
}
