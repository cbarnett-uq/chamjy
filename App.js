import MainLayout from "./components/MainLayout.js";
import Session from './components/pages/session.js';
import FileSelection from "./components/FileSelection.js"

export default function App() {
  return (
    <MainLayout>
          <FileSelection/>
    </MainLayout>
  );
}