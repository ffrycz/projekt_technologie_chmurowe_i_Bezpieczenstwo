import {useEffect, useRef} from "react";
import { useKeycloak } from "@react-keycloak/web";
import { FaTrash } from "react-icons/fa";
import axios from "axios";

export default function Post({ id, author, code, description, onDelete }) {
  const copyButton = useRef();
  const { keycloak, initialized } = useKeycloak();

  const copyCode = () => {
    navigator.clipboard.writeText(code).then(() => {
      copyButton.current.innerText = "Copied!";
      setTimeout(() => {
        copyButton.current.innerText = "Copy";
      }, 10000);
    });
  };

  useEffect(() => {
    console.log({ id, author, code, description });
  },[])

  return (
    <div className="bg-gray-800 m-5 h-max border-white border-2 w-full rounded-2xl p-4 flex gap-4">
      <div>
        <div className="flex">
          <div className="text-xs">{author}</div>
        </div>
        <div className={"post_content"}>
          <div className={"text-3xl font-bold text-white"}>{code}</div>
          <div className={"description"}>{description}</div>
          <div>
            <button
                className={"bg-blue-800 text-white p-4 font-bold"}
                onClick={copyCode}
                ref={copyButton}
            >
              Copy
            </button>
            {(keycloak.authenticated && keycloak.hasRealmRole("admin")) ||
            (keycloak.tokenParsed?.preferred_username === author && keycloak.hasRealmRole("verified_company")) ? (
                <button
                    className={"ml-3"}
                    onClick={() => {
                      axios.delete(`/api/posts/${id}`,{
                        headers: {
                          Authorization: `Bearer ${keycloak.token}`,
                        },
                      }).then(() => {
                        onDelete();
                      });
                    }}
                >
                  <FaTrash color={"red"} />
                </button>
            ): null}
          </div>
        </div>
      </div>
    </div>
  );
}
