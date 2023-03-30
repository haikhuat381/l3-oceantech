import React from "react";
import Layout from "./components/Layout/Layout";
import { useRoutes } from "react-router-dom";
import routes from "./Routes";

const App = () => {
  const content = useRoutes(routes);
  return (
    <>
      <>{content}</>
    </>
  );
};

export default App;
