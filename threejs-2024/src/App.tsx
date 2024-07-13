import {
  createBrowserRouter,
  RouterProvider,
  Link,
  Outlet,
} from "react-router-dom";

import ThreeLine from "./components/Line";
import ThreeModel from "./components/Model";
import ThreeScene from "./components/ThreeScene";

const AppLayout = () => (
  <>
    <header style={{ margin: "16px 0", textAlign: "center" }}>
      <nav>
        <Link
          to="/"
          style={{
            padding: "4px 8px",
            border: "1px solid #000",
            color: "#000",
            textDecoration: "none",
          }}
        >
          Home
        </Link>
        <Link
          to="/box"
          style={{
            padding: "4px 8px",
            border: "1px solid #000",
            color: "#000",
            textDecoration: "none",
          }}
        >
          Box
        </Link>
        <Link
          to="/line"
          style={{
            padding: "4px 8px",
            border: "1px solid #000",
            color: "#000",
            textDecoration: "none",
          }}
        >
          Line
        </Link>
        <Link
          to="/model"
          style={{
            padding: "4px 8px",
            border: "1px solid #000",
            color: "#000",
            textDecoration: "none",
          }}
        >
          Model
        </Link>
      </nav>
    </header>
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <h1>ThreeJS Test</h1>,
      },
      {
        path: "/box",
        element: <ThreeScene />,
      },
      {
        path: "/line",
        element: <ThreeLine />,
      },
      {
        path: "/model",
        element: <ThreeModel />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
