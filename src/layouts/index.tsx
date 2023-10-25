import { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <h1>Layout</h1>
      {children}
    </div>
  );
}

export default Layout;
