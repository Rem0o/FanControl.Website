import * as React from "react";
import { Link, HeadFC } from "gatsby";

const NotFoundPage = () => {
  return (
    <main>
      404 <Link to="/">Go home</Link>.
    </main>
  );
};

export default NotFoundPage;

export const Head: HeadFC = () => <title>Not found</title>;
