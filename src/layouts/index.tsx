import { ReactNode } from "react";
import Header from "./header";
import Footer from "./footer";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
