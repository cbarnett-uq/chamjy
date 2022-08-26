import { Text } from 'react-native';
import GestureCamera from './components/gestures/GestureCamera.js';
import MainLayout from "./components/MainLayout.js";

export default function App() {
  return (
    <MainLayout>
      <GestureCamera/>
    </MainLayout>
  );
}
