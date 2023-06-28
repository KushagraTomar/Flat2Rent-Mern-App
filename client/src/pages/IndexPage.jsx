import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

export default function IndexPage() {
    const [places, setPlaces] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:4000/places').then(res => {
            setPlaces(res.data);
        });
    }, []);

    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
        const response = await axios.get(`http://localhost:4000/apartments?title=${searchQuery}`);
       
        navigate('/searchPage',{ state: response.data});
        } catch (error) {
        console.error(error);
        }
    };

    return (
    <>
        <div className="gap-3 py-2 px-4 flex-equally border border-gray-300 rounded-full shadow shadow-gray-300">
            <div>
                <form className="flex" onSubmit={handleSearch}>
                    <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by place name" />
                    <button className="bg-primary text-white p-3 ml-3 rounded-full" type="submit">
                        Search
                    </button>
                </form>
            </div>
        </div>
        <div className="mt-8 gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {places.length > 0 && places.map(place => (
                <div key={place._id}>
                    <Link to={'/place/'+place._id}>
                    <div className="bg-gray-500 mb-2 rounded-2xl flex">
                            {place.photos?.[0] && (
                                <img className="rounded-2xl object-cover aspect-square" src={"http://localhost:4000/uploads/"+place.photos?.[0]} alt=""/>
                            )}
                        </div>
                        
                        <h2 className="font-bold">{place.address}</h2>
                        <h2 className="text-sm text-gray-500">{place.title}</h2>
                        <div className="mt-1">
                            <span className="font-bold">${place.price}</span> per night
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    </>
    );
 }