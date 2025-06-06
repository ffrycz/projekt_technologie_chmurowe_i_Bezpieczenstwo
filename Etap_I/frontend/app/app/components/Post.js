import {useRef} from "react";
import { useKeycloak } from '@react-keycloak/web'
import {FaTrash} from "react-icons/fa";
import axios from "axios";

export default function Post({id, author, code, description, date}) {
    const copyButton = useRef();
    const { keycloak, initialized } = useKeycloak();

    const copyCode = () => {
        navigator.clipboard.writeText(code).then(() => {
            copyButton.current.value = "Copied!";
            setTimeout(() => {
                copyButton.current.value = "Copy";
            }, 50000);
        });
    }

    return (
        <div className="bg-gray-800 mt-5 h-max border-white border-2 w-full rounded-2xl p-4 flex gap-3">
            <div>
                <div className="flex">
                    <div className="text-xs">{author}</div>
                    <p className={"text-xs"}>{date}</p>
                    <div>
                        {keycloak.authenticated && keycloak.hasRealmRole("admin") || keycloak.tokenParsed.preffered_name === author (
                            <button onClick={()=>{
                                axios.delete("http://localhost:5000/posts/", id)
                            }}><FaTrash color={"red"}/></button>
                        )}
                    </div>

                </div>
                <div className={"post_content"}>
                    <div className={"text-3xl font-bold"}>{code}</div>
                    <div className={"description"}>{description}</div>
                    <button className={"bg-blue-800 text-white p-4 font-bold"}
                            onClick={copyCode()}
                            ref={copyButton}
                    >Copy</button>
                </div>
            </div>
        </div>
    )
}