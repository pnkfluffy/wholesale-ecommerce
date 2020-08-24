import React from "react";
import { Link } from "react-router-dom";

const PageError = () => {
  return (
    <div className="page_404">
      <div className="container_404">
        <div className="big_text">
        OOPS!
          </div>  
        <div>404 - THE PAGE CAN'T BE FOUND</div>
        <Link to="/"><u>GO TO HOMEPAGE</u></Link>
      </div>
    </div>
  );
};

export default PageError;
