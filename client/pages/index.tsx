import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { gql, useQuery } from "@apollo/client";

const GET_CLIENTS = gql`
  query get_all_clients {
    clients {
      name
      email
      phone
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) {
    return <>loading...</>;
  }
  if (error) {
    return <>{error.message}</>;
  }
  if (data) {
    console.log("🥷", data);
    return (
      <div className={styles.container}>
        <Head>
          <title>Project Management App</title>
        </Head>
        <main className={styles.main}>Holi</main>

        <footer className={styles.footer}>v1.0.0 - ©carl0sarb0leda</footer>
      </div>
    );
  }
  return null;
}
