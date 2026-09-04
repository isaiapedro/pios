import React, { useEffect } from "react";

import { openDb, runMigrations } from "./src/db/schema";
import RootNavigator from "./src/navigation/RootNavigator";
import { requestPermissions } from "./src/notifications";

export default function App() {
  useEffect(() => {
    // Initialize local SQLite DB + request notification permissions on first launch
    openDb().then(runMigrations).catch(console.error);
    requestPermissions().catch(console.error);
  }, []);

  return <RootNavigator />;
}
