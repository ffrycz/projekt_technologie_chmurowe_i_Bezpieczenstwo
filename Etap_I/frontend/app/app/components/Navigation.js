"use client"

import { useKeycloak } from '@react-keycloak/web'
import Link from "next/link";
import { FaSearch } from "react-icons/fa"
import {useRef} from "react";
import  { useRouter } from "next/navigation";
import { useSearch } from "@/context/SearchContext";

export default function Navigation() {
    const searchBar = useRef("");
    const { keycloak, initialized } = useKeycloak();
    const router = useRouter();
    const { result, search } = useSearch();

    return (
        <nav className={`p-4 bg-gray-800 text-white flex justify-between`}>
            <Link href="/" className={'text-4xl font-bold'}>
                Code center
            </Link>
            <div className={"w-2/3 mt-5 pl-36 flex justify-center"}>
                <input
                    ref={searchBar}
                    className={" w-3/5 bg-black h-10 text-white border-2 p-1 border-b-4 active:border-b-2"}
                    type={'text'}
                    placeholder={"Search for a shop..."}/>
                <button onClick={() => search(searchBar.current.value)}
                        className={"bg-black p-2 h-10 relative border-2 border-white border-b-4 hover:border-b-2 active:bg-gray-700"}>
                    <FaSearch color={"white"}/></button>
            </div>
            <div className={"flex flex-col"}>
            <p className={"text-xl font-bold"}>Hello {keycloak.tokenParsed?.preferred_username}!</p>
                {(keycloak.authenticated && keycloak.hasRealmRole("admin")) || keycloak.hasRealmRole("verified_company") ?
                (
                <button className={"bg-blue-800 rounded-2xl mt-2 pl-5 pr-5 w-max "} onClick={() => {
                    router.push("/create")
                }}>
                    + Add new code
                </button>
            ) : null}
            <div>
                {initialized && (
                    <div className={"flex flex-col justify-between"}>
                        <button className={"hover:underline hover:bg-gray-800 hover:text-white text-xs"} onClick={keycloak.logout}>LogOut</button>
                    </div>
                )}
            </div>
            </div>

        </nav>
    )
}