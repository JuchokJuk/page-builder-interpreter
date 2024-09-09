import { Link, useParams } from "react-router-dom";

export function RouteHandler() {
  const params = useParams();

  return (
    <div>
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/user/1">User</Link>
        <Link to="/user/1/profile">Profile</Link>
        <Link to="/user/1/settings">Settings</Link>
      </div>
      <pre>{JSON.stringify(params, null, 2)}</pre>
    </div>
  );
}
