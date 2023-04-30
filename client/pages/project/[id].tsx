import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../api/projects/queries";
import { FaEnvelope, FaPhone, FaIdBadge } from "react-icons/fa";
import { useRouter } from "next/router";
import { GetProjectResponse } from "../../types/project";
import Link from "next/link";

export default function Project() {
  const router = useRouter();
  const { id } = router.query;
  const { loading, error, data } = useQuery<GetProjectResponse>(GET_PROJECT, {
    variables: { id },
  });

  if (loading) return <>loading...</>;
  if (error) return <>{error.message}</>;

  return (
    <>
      {data && (
        <div className="mx-auto w-75 card p-5 mt-4" style={{ color: "black" }}>
          <Link href="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">
            Back
          </Link>
          <h1>{data.project.name}</h1>
          <p>{data.project.description}</p>
          <h5 className="mt-3">Project Status</h5>
          <p>{data.project.status}</p>
          <h5 className="mt-5">Client Information</h5>
          <ul className="list-group">
            <li className="list-group-item">
              <FaIdBadge className="icon" /> {data.project.client.name}
            </li>
            <li className="list-group-item">
              <FaEnvelope className="icon" /> {data.project.client.email}
            </li>
            <li className="list-group-item">
              <FaPhone className="icon" /> {data.project.client.phone}
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
