import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {useKeycloak} from "@react-keycloak/web";
import Navigation from "@/app/components/Navigation";
import {ReactKeycloakProvider} from "@react-keycloak/web";
import keycloakConf from "@/app/components/keycloak";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Code center",
  description: "Find a discount code for anything",
};

export default function RootLayout({ children }) {
    const { keycloak, initialized } = useKeycloak();

    if (!initialized) {
        return <div>Loading...</div>;
    }

  return (
    <html lang="en">
        <ReactKeycloakProvider keycloak={keycloakConf}>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
            {keycloak.authenticated ? (
                <>
                    <Navigation/>
                    {children}
                </>
            ) : (
                <>
                    <p>You are not logged in</p>
                    <button onClick={() => keycloak.login()}>Log In</button>
                </>
            )}
            </body>
        </ReactKeycloakProvider>
    </html>
  );
}
