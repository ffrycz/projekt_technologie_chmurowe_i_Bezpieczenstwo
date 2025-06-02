// app/layout.js
import './globals.css';
import ClientAuthLayout from './components/ClientAuthLayout';
export const metadata = {
    title: 'My App',
    description: 'Description',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body className="antialiased">
        <ClientAuthLayout>{children}</ClientAuthLayout>
        </body>
        </html>
    );
}
