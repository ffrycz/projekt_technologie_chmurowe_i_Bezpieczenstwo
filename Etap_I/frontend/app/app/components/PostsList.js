import {FixedSizeList} from "react-window";
import {React} from "next/dist/server/route-modules/app-page/vendored/rsc/entrypoints";
import Post from "@/app/components/Post";

export default function PostsList({posts}) {
    const renderRow = ({ index, style }) => {
        if (!posts || !posts[index]) {
            return <div style={style}>Loading...</div>;
        }

        const post = posts[index];

        return (
            <div style={{ ...style }} className={`flex h-max w-max mt-5`}>
                <Post
                    id={post.id}
                    author={post.author}
                    code={post.code}
                    description={post.description}
                    date={post.date}
                />
            </div>
        );
    };

    return (
        <div>
            {posts && (
                <FixedSizeList
                    height={window.innerHeight - 130}
                    width={"100%"}
                    itemCount={posts.length}
                    itemSize={200}
                >
                    {renderRow}
                </FixedSizeList>
            )}
        </div>
    );
}