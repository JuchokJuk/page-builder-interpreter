// тип json страницы не определён
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { RouteHandler } from "./RouteHandler";

const handlers = {
  Card: ({ children, ...props }) => <Card {...props}>{children}</Card>,
  CardHeader: ({ children, ...props }) => <CardHeader {...props}>{children}</CardHeader>,
  CardTitle: ({ children, ...props }) => <CardTitle {...props}>{children}</CardTitle>,
  CardDescription: ({ children, ...props }) => <CardDescription {...props}>{children}</CardDescription>,
  CardContent: ({ children, ...props }) => <CardContent {...props}>{children}</CardContent>,
  CardFooter: ({ children, ...props }) => <CardFooter {...props}>{children}</CardFooter>,
  Button: ({ children, ...props }) => <Button {...props}>{children}</Button>,
  div: ({ children, ...props }) => <div {...props}>{children}</div>,
};

function RenderNode({ node, routeScheme }: { node: unknown; routeScheme: unknown }) {
  const Handler = handlers[node.displayName];

  const { children, ...props } = node.props;

  return (
    <Handler {...props}>
      {children}
      
      {node.nodes.map((id: string) => (
        <RenderNode key={id} node={routeScheme[id]} routeScheme={routeScheme} />
      ))}

      {Object.keys(node.linkedNodes).map((id: string) => (
        <RenderNode key={id} node={routeScheme[node.linkedNodes[id]]} routeScheme={routeScheme} />
      ))}
    </Handler>
  );
}

export function RouteInterpreter({ routeScheme }: { routeScheme: unknown }) {
  return (
    <>
      <RouteHandler />
      {routeScheme.ROOT.nodes.map((id: string) => (
        <RenderNode key={id} node={routeScheme[id]} routeScheme={routeScheme} />
      ))}
    </>
  );
}
