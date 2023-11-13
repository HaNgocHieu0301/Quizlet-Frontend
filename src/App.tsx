import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes";
import Layout from "./layouts";
import { AuthProvider, RequireAuth } from "react-auth-kit";

function App() {
  return (
    <div className="App">
      {/* <AuthProvider
        authType="cookie"
        authName="_auth"
        cookieDomain={window.location.hostname}
        cookieSecure={false}
      > */}
      <Router>
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.element;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  route.auth ? (
                    <Layout>
                      {/* <RequireAuth loginPath="/"> */}
                      <Page />
                      {/* </RequireAuth> */}
                    </Layout>
                  ) : (
                    <Layout>
                      <Page />
                    </Layout>
                  )
                }
              />
            );
          })}
        </Routes>
      </Router>
      {/* </AuthProvider> */}
    </div>
  );
}
export default App;
