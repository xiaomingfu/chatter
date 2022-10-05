import {
  Route,
  Routes
} from "react-router-dom";

import ChatterPage from "./components/ChatterPage";
import SearchPage from "./components/SearchPage";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<ChatterPage />} />
        <Route path="search" element={<SearchPage />} />
      </Route>
    </Routes>
  );
}

export default App;
