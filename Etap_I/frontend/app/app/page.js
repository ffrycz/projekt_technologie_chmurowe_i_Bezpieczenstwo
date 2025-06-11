"use client";
import PostsList from "./components/PostsList";
import { useEffect, useState } from "react";
import axios from "axios";
import { useKeycloak } from "@react-keycloak/web";
import {useSearch} from "@/context/SearchContext";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { keycloak, initialized } = useKeycloak();
  const { result, search } = useSearch();


  useEffect(() => {
    if (!keycloak?.token) return;

    const fetchPosts = async () => {
      if (result?.length > 0) {
        setPosts(result);
      }else{
        axios
            .get(`/api/allPosts`, {
              headers: {
                Authorization: `Bearer ${keycloak.token}`,
              },
            })
            .then((response) => {
              setPosts(response.data.reverse());
            })
            .catch((error) => {
              console.error("Error fetching posts:", error);
            });
      }
    };

    fetchPosts();
  }, [result, keycloak]);

  return (
      <>
    <div className="grid items-center justify-items-center h-max">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <PostsList posts={posts} setPosts={setPosts} />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  </>

  );
}
