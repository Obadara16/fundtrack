import React, { useState, useEffect } from "react";

const Loader = () => {

  return (
    <>
      <div className="text-center">
        <div className="spinner-border spinner-border-sm" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Loader;
