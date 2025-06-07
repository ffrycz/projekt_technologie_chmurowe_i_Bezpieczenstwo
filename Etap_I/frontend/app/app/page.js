"use client";
import PostsList from "./components/PostsList";
import { useEffect, useState } from "react";
import axios from "axios";
import { useKeycloak } from "@react-keycloak/web";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { keycloack, initialized } = useKeycloak();

  useEffect(() => {
    axios
      .get(`http://flask-api:5000/api/allPosts`, {
        headers: {
          Authorization: `Berer ${keycloack.token}`,
        },
      })
      .then((response) => {
        const responseData = response.data.posts;
        const groupedPosts = responseData.reduce((acc, elem) => {
          acc[elem.date] = acc[elem.date] || [];
          acc[elem.date].push(elem);
          return acc;
        }, {});

        const sortedPosts = Object.entries(groupedPosts)
          .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA)) // sortowanie po dacie
          .map(([_, posts]) => posts)
          .flat();

        setPosts(sortedPosts);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <PostsList posts={posts} />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
