import GeneratePage from "./pages/GeneratePage";
import { LoadingProvider } from "./contexts/LoadingContext";

function App() {
  return (
    <LoadingProvider>
      <GeneratePage />
    </LoadingProvider>
  );
}

export default App;
