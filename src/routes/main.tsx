import { createRoot } from "react-dom/client";

import "../shared/styles/global.css";

import { createBrowserRouter, RouteObject, RouterProvider } from "react-router-dom";
import { RouteLoader } from "./route/RouteLoader";

export interface RouteConfig {
  path: string;
  scheme: string;
  children?: RouteConfig[];
}

function transformRouteConfig(routeConfig: RouteConfig): RouteObject {
  return {
    path: routeConfig.path,
    element: <RouteLoader routeSchemeURL={routeConfig.scheme} />,
    children: routeConfig.children?.map(transformRouteConfig),
  };
}

const routesSchemeURL = "/scheme/routes.json";
const response = await fetch(routesSchemeURL);
const routesScheme: RouteConfig[] = await response.json();
const router = createBrowserRouter(routesScheme.map((routeConfig) => transformRouteConfig(routeConfig)));

createRoot(document.getElementById("root")!).render(<RouterProvider router={router} />);
