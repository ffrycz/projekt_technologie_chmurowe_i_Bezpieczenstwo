"use client";
import PostsList from "./components/PostsList";
import { useEffect, useState } from "react";
import axios from "axios";
import { useKeycloak } from "@react-keycloak/web";

export default function Home({ searchQuery}) {
  const [posts, setPosts] = useState([]);
  const { keycloak, initialized } = useKeycloak();

  const generatePosts = (response) => {
    const responseData = response.data.posts || response.data;

    const groupedPosts = responseData.reduce((acc, elem) => {
      acc[elem.date] = acc[elem.date] || [];
      acc[elem.date].push(elem);
      return acc;
    }, {});

    const sortedPosts = Object.entries(groupedPosts)
        .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA))
        .map(([_, posts]) => posts)
        .flat();

    setPosts(sortedPosts);
  }

  useEffect(() => {
    if (!keycloak?.token) return;

    const fetchPosts = async () => {

        if (searchQuery) {
          axios.get(
              `/api/posts/${encodeURIComponent(searchQuery)}`,
              {
                headers: {
                  Authorization: `Bearer ${keycloak.token}`,
                },
              }
          ).then((response) => {
            console.log("Response data:", response.data);
            generatePosts(response);
          }).catch((error) => {
            console.error("Error fetching posts:", error);
          });
        } else {
          axios.get(`/api/allPosts`, {
            headers: {
              Authorization: `Bearer ${keycloak.token}`,
            },
          }).then((response) => {
            generatePosts(response);
          }).catch((error) => {
            console.error("Error fetching posts:", error);
          });
        }

    };

    fetchPosts();
  }, [searchQuery, keycloak]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <PostsList posts={posts} />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
