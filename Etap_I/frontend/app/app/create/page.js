"use client"
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useKeycloak } from '@react-keycloak/web'
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function CreatePostPage() {

    const {keycloak, initialized} = useKeycloak();
    const [failed, setFailed] = useState(false)
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            code: '',
            description: '',
        },
        validationSchema: Yup.object({
            code: Yup.string().required('Code is required'),
            description: Yup.string().required('Description is required'),
        }),
        onSubmit: values => {
            axios
                .post("http://localhost:5000/api/post", {code: values.code, description: values.description, author: keycloak.userInfo.name})//nie wiem, czy to zadziała z tym keycloak
                .then(res => {
                    router.push("/");
                })
                .catch(err => {
                    setFailed(true);
                })
        }
    })

    return (
        <main>
            {keycloak.authenticated && keycloak.hasRealmRole("admin") || keycloak.hasRealmRole("verified_company") ? (
                <div className={"w-64 h-max m-10 p-6 flex flex-col items-center rounded bg-black z-10"}>
                    <h1 className={"text-3xl m-3"}>Create a post</h1>
                    { failed && (
                        <p className={"text-xs text-red-600"}>Something went wrong</p>
                    )}
                    <form onSubmit={formik.handleSubmit} className={"flex flex-col items-center justify-center"}>
                        <label>Code</label>
                        <input
                            id="code"
                            type="text"
                            className={"text-black"}
                            {...formik.getFieldProps('code')}/>
                        {formik.touched.code && formik.errors.code ? (
                            <div className={"text-xs text-red-600"}>{formik.errors.code}</div>
                        ) : null}
                        <label>Description</label>
                        <textarea
                            id="description"
                            className={"text-black"}
                            {...formik.getFieldProps('description')}/>
                        {formik.touched.description && formik.errors.description ? (
                            <div className={"text-xs text-red-600"}>{formik.errors.description}</div>
                        ) : null}
                        <button type={"submit"} className={"bg-gray-700 p-1 rounded border-gray-800 mt-1 w-20"}
                        >Post</button>
                    </form>
                </div>
            ) : (
                <p>Page not found</p>
            )}
        </main>
    )
}
