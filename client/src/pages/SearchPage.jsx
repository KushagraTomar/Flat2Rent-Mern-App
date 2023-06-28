import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function SearchPage() {
  const location = useLocation();
  const searchResults = location.state;

  return (
    <div className="mt-8 gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <Link to={"/place/" + searchResults._id}>
        <div className="bg-gray-500 mb-2 rounded-2xl flex">
          {searchResults.photos?.[0] && (
            <img
              className="rounded-2xl object-cover aspect-square"
              src={"http://localhost:4000/uploads/" + searchResults.photos?.[0]}
              alt=""
            />
          )}
        </div>

        <h2 className="font-bold">{searchResults.address}</h2>
        <h2 className="text-sm text-gray-500">{searchResults.title}</h2>
        <div className="mt-1">
          <span className="font-bold">${searchResults.price}</span> per night
        </div>
      </Link>
    </div>
  );
}
