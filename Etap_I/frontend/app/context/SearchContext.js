"use client"

import {createContext, useContext, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import {useKeycloak} from "@react-keycloak/web";
const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const router = useRouter();
    const [result, setResult] = useState(null);
    const { keycloak, initialized } = useKeycloak()

    const search = (searched) => {
        router.push("/")
        if (!searched) {
            setResult([]);
            return;
        }

        axios
            .get(`/api/posts/${encodeURIComponent(searched)}`, {
                headers: {
                    Authorization: `Bearer ${keycloak.token}`,
                },
            })
            .then((response) => {
                setResult(response.data.reverse());
            })
            .catch((error) => {
                console.error("Error fetching posts:", error);
            });
    }

    return (
        <SearchContext.Provider value={{ result, search }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => useContext(SearchContext);