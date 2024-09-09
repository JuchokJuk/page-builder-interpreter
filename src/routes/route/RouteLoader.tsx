import { useEffect, useState } from "react";
import { RouteInterpreter } from "./RouteInterpreter";

export function RouteLoader({ routeSchemeURL }: { routeSchemeURL: string }) {
  const [routeScheme, setRouteScheme] = useState<unknown | undefined>();

  async function loadRouteScheme(routeSchemeURL: string) {
    const response = await fetch(routeSchemeURL);
    const data = await response.json();
    setRouteScheme(data);
  }

  useEffect(() => {
    loadRouteScheme(routeSchemeURL);
  }, [routeSchemeURL]);

  if (!routeScheme) return null;

  return <RouteInterpreter routeScheme={routeScheme} />;
}
