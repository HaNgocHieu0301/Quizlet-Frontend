import { ReactNode } from "react";
import Header from "./header";
import Footer from "./footer";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      <div className="bg-gray-100">{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
