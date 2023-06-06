import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

import TabRoutes from "./app.tab.routes";
import AuthRoutes from "./auth.routes";

function Routes() {
  const { user } = useContext(AuthContext);

  return user.id ? <TabRoutes /> : <AuthRoutes />;
}

export default Routes;
