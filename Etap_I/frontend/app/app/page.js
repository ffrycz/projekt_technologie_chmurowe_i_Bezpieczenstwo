"use client";
import PostsList from "./components/PostsList";
import { useEffect, useState } from "react";
import axios from "axios";
import { useKeycloak } from "@react-keycloak/web";

export default function Home({ searchQuery }) {
  const [posts, setPosts] = useState([]);
  const { keycloak, initialized } = useKeycloak();


  useEffect(() => {
    if (!keycloak?.token) return;

    const fetchPosts = async () => {
      if (searchQuery) {
        axios
          .get(`/api/posts/${encodeURIComponent(searchQuery)}`, {
            headers: {
              Authorization: `Bearer ${keycloak.token}`,
            },
          })
          .then((response) => {
            console.log("Response data:", response.data);
            setPosts(response.data.reverse());
          })
          .catch((error) => {
            console.error("Error fetching posts:", error);
          });
      } else {
        axios
          .get(`/api/allPosts`, {
            headers: {
              Authorization: `Bearer ${keycloak.token}`,
            },
          })
          .then((response) => {
            console.log("Response data:", response.data);
            setPosts(response.data.reverse());
          })
          .catch((error) => {
            console.error("Error fetching posts:", error);
          });
      }
    };

    fetchPosts();
  }, [searchQuery, keycloak]);

  return (
      <>
    <div className="grid items-center justify-items-center h-max">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <PostsList posts={posts} />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  </>

  );
}
