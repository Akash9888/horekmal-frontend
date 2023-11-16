import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";

const CustomLink = ({ to, children }) => {
  return (
    <Link component={RouterLink} to={to}>
      {children}
    </Link>
  );
};

export default CustomLink;
