import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FaSearch } from "react-icons/fa";


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});


const districtsData = [
    { name: "Dhaka", position: [23.8103, 90.4125] },
    { name: "Chittagong", position: [22.3569, 91.7832] },
    { name: "Khulna", position: [22.8456, 89.5403] },
    { name: "Rajshahi", position: [24.3745, 88.6042] },
    { name: "Sylhet", position: [24.8949, 91.8687] },
    { name: "Barisal", position: [22.7010, 90.3535] },
    { name: "Rangpur", position: [25.7460, 89.2500] },
    { name: "Mymensingh", position: [24.7471, 90.4203] },
    // Add all 64 districts here...
];

const Coverage = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredDistricts = searchTerm === ''
        ? districtsData
        : districtsData.filter(district =>
            district.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
        );

    return (
        <div className='max-w-7xl m-3 lg:mt-10 mx-auto rounded-2xl bg-white shadow'>
            <div className="lg:px-12 p-5 lg:py-18 ">
            <h1 className="lg:text-3xl text-2xl text-[#03373D] font-bold text-start mb-6">We are available in 64 districts</h1>
            <div className="flex items-center w-full md:w-1/2  mb-6">
                <div className="flex flex-grow items-center bg-gray-100 px-4 py-2 rounded-l-full shadow">
                    <FaSearch className="text-gray-500 mr-2" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search here"
                        className="bg-gray-100 focus:outline-none w-full"
                    />
                </div>
                <button  onClick={() => {}}className="bg-lime-300 hover:bg-lime-400 text-black font-medium px-6 py-2 rounded-r-full -ml-20 rounded-l-full ">
                    Search
                </button>
            </div>
            <div className='border-t border-gray-300'></div>
            <p className='mt-10 mb-10 text-xl font-bold text-[#03373D]'>We deliver almost all over Bangladesh</p>

            <MapContainer center={[23.6850, 90.3563]} zoom={7} scrollWheelZoom={false} style={{ height: "500px", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {filteredDistricts.map((district, index) => (
                    <Marker key={index} position={district.position}>
                        <Popup>{district.name}</Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
        </div>
    );
};

export default Coverage;
