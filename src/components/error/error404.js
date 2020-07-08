import React from "react";
import { Link } from "react-router-dom";

const PageError = () => {
  return (
    <div>
      <div>
        OOPS!
        <div>404 - THE PAGE CAN'T BE FOUND</div>
        <Link to="/">GO TO HOMEPAGE</Link>
      </div>
    </div>
  );
};

export default PageError;
