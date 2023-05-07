import { useMutation, useQuery } from "@apollo/client";
import { GET_PROJECT, GET_PROJECTS } from "../api/projects/queries";
import { DELETE_PROJECT } from "../api/projects/mutations";
import { FaEnvelope, FaPhone, FaIdBadge, FaTrash } from "react-icons/fa";
import { useRouter } from "next/router";
import { GetProjectResponse } from "../../types/project";
import { ProjectModal } from "../../components";
import Link from "next/link";

export default function Project() {
  const router = useRouter();
  const { id } = router.query;
  const { loading, error, data } = useQuery<GetProjectResponse>(GET_PROJECT, {
    variables: { id },
  });

  /**
   * Delete Project has a different logic from delete client
   * In here we refetch data, rather than update cache,
   * also the parameter are pass in useMutation hook directly
   * rather than in deleteProject function
   */
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: id },
    onCompleted: () => router.push("/"),
    refetchQueries: [{ query: GET_PROJECTS }],
    onError: (error) => {
      alert(error.message);
    },
  });

  const handleDeleteProject = () => {
    deleteProject();
  };

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
          <div className="d-flex mt-5 ms-auto gap-1">
            <ProjectModal editMode project={data.project} />
            <button className="btn btn-danger" onClick={handleDeleteProject}>
              <FaTrash className="icon" /> Delete Project
            </button>
          </div>
        </div>
      )}
    </>
  );
}
