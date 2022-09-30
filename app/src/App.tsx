import Chatter from "./components/Chatter";
import Layout from "./components/Layout";
import UsersGrid from "./components/UsersGrid";
import useSearchInput from "./lib/graph/local/searchInput";

function App() {
  const { searchInput } = useSearchInput();

  if (searchInput) {
    return (
      <Layout>
        <UsersGrid />
      </Layout>
    );
  }

  return (
    <Layout>
      <Chatter />
    </Layout>
  );
}

export default App;
