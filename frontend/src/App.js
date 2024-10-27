import { lazy } from 'react';
import 'leaflet/dist/leaflet.css';

const MapContainer = lazy(() => import("./components/MapContainer/index"));

function App() {
  return (
    <div >
      <MapContainer />
    </div>
  );
}

export default App;
