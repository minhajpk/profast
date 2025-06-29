import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FaSearch } from "react-icons/fa";
import { useLoaderData } from 'react-router'; // ensure this import

// Fix marker icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Fly to searched coordinates
function FlyToDistrict({ coords }) {
  const map = useMap();
  if (coords) {
    map.flyTo(coords, 14, { duration: 1.5 });
  }
  return null;
}

const Coverage = () => {
  const serviceCenters = useLoaderData(); 
  const [searchText, setSearchText] = useState('');
  const [activeCoords, setActiveCoords] = useState(null);

  if (!Array.isArray(serviceCenters)) {
    return <p>Loading service centers...</p>;
  }

  const handleSearch = (e) => {
    e.preventDefault();
    const district = serviceCenters.find(d =>
      d.district.toLowerCase().includes(searchText.trim().toLowerCase())
    );
    if (district) {
      setActiveCoords([district.latitude, district.longitude]);
    }
  };

  return (
    <div className='max-w-7xl m-3 lg:mt-10 mx-auto rounded-2xl bg-white shadow'>
      <div className="lg:px-12 p-5 lg:py-18">
        <h1 className="lg:text-3xl text-2xl text-[#03373D] font-bold text-start mb-6">
          We are available in 64 districts
        </h1>

        <form onSubmit={handleSearch} className="flex items-center w-full md:w-1/2 mb-6 bg-gray-100 rounded-full overflow-hidden shadow">
          <div className="flex items-center px-4 w-full">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search here"
              className="bg-transparent focus:outline-none w-full py-2"
            />
          </div>
          <button
            type="submit"
            className="bg-lime-300 hover:bg-lime-400 text-black font-medium px-6 py-2"
          >
            Search
          </button>
        </form>

        <div className='border-t border-gray-300'></div>
        <p className='mt-10 mb-10 text-xl font-bold text-[#03373D]'>
          We deliver almost all over Bangladesh
        </p>

        <MapContainer center={[23.6850, 90.3563]} zoom={7} scrollWheelZoom={false} style={{ height: "500px", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {activeCoords && <FlyToDistrict coords={activeCoords} />}
          {serviceCenters.map((center, index) => (
            <Marker key={index} position={[center.latitude, center.longitude]}>
              <Popup>{center.district}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
