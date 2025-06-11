'use client'
import {FixedSizeList} from "react-window";
import Post from "@/app/components/Post";
import React from "react";
import { useEffect, useState } from "react";

export default function PostsList({posts, setPosts}) {
    const [size, setSize] = useState({height:1000, width:900});
    useEffect(() => {
        const handleResize = () => {
            setSize({ height: window.innerHeight - 110, width: window.innerWidth });
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const renderRow = ({ index, style }) => {
        if (!posts || !posts[index]) {
            return <div style={style}>Loading...</div>;
        }

        const post = posts[index];

        return (
            <div style={style} className={`flex h-max w-2/3 md-5 gap-2`}>
                <Post
                    id={post.id}
                    author={post.author}
                    code={post.code}
                    description={post.description}
                    onDelete={() => {
                        setPosts(prev => prev.filter(p => p.id !== post.id));
                    }}
                />
            </div>
        );
    };

    return (
        <div>
            {posts ? (
                <FixedSizeList
                    height={size.height}
                    width={size.width}
                    itemCount={posts.length}
                    itemSize={200}
                >
                    {renderRow}
                </FixedSizeList>
            ) : (
                <div className={"w-12 h-12 text-white"}>No posts to display</div>
            )}
        </div>
    );
}