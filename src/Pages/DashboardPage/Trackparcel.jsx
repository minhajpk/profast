import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/axiosSecure';

const ConsignmentTracker = () => {
  const axiosSecure = useAxiosSecure();
  const [trackingCode, setTrackingCode] = useState('');
  const [searchCode, setSearchCode] = useState('');

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['consignment', searchCode],
    queryFn: async () => {
      if (!searchCode) return null;
      const res = await axiosSecure.get(`/trackings/${searchCode}`);
      return res.data; // expecting array of tracking updates
    },
    enabled: !!searchCode,
  });

  const handleSearch = () => {
    setSearchCode(trackingCode.trim());
  };

  return (
    <div className="max-w-5xl  p-6 m-10 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Track Your Consignment</h2>
      <p className="text-gray-600 mb-8">Enter your tracking code to see the latest updates.</p>

      {/* Search box */}
      <div className="mb-10 flex">
        <input
          type="text"
          value={trackingCode}
          onChange={(e) => setTrackingCode(e.target.value)}
          placeholder="Enter tracking_id"
          className="w-full max-w-md px-4 py-2 bg-gray-100  rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-400"
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button
          onClick={handleSearch}
          className="px-5 py-2 bg-lime-400 rounded-r-md hover:bg-lime-500 text-white font-semibold"
        >
          Search
        </button>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="text-center py-10 text-lg">Loading tracking info...</div>
      )}

      {/* Error */}
      {isError && (
        <div className="text-center text-red-600 py-10">
          Error: {error.message}
        </div>
      )}

      {/* No data found */}
      {!isLoading && !isError && searchCode && (!data || data.length === 0) && (
        <div className="text-center text-gray-500 py-10">
          No consignment found for "{searchCode}".
        </div>
      )}

      {/* Tracking Updates */}
      {data && data.length > 0 && (
        <div>
          <h3 className="text-2xl font-semibold mb-6">Tracking Updates</h3>
          <div className="space-y-6">
            {data.map((update) => (
              <div
                key={update._id}
                className="p-4 rounded-md bg-gray-50 shadow"
              >
                <p><strong>Status:</strong> <span className="capitalize">{update.status.replace(/_/g, ' ')}</span></p>
                <p><strong>Details:</strong> {update.details}</p>
                <p><strong>Updated by:</strong> {update.updated_by}</p>
                <p><strong>Date:</strong> {new Date(update.timestamp).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsignmentTracker;
