import { Link } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useParams } from 'react-router-dom';
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);
  const {id} = useParams();

  useEffect(() => {
    axios.get('http://localhost:4000/user-places').then(({data}) => {
      setPlaces(data);
    })
  }, []);

  const fetchData = async () => {
    try {
      axios.get('http://localhost:4000/user-places').then(({data}) => {
      setPlaces(data);
    })
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    console.log(`Div clicked! ID: ${id}`);
    try {
      await axios.delete(`http://localhost:4000/places/${id}`); // Replace with your API endpoint and the appropriate ID parameter
      // Refresh the data after successful deletion
      fetchData();
    } catch (error) {
      console.error('Error deleting place:', error);
    }
    // try {
    // const response = await axios.get(`http://localhost:4000/apartments?title=${searchQuery}`);
   
    // navigate('/searchPage',{ state: response.data});
    // } catch (error) {
    // console.error(error);
    // }
};

  return (
    <div>
      <AccountNav />
      <div className="text-center">
        <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={"/account/places/new"} >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/> 
          </svg>
          Add new place
        </Link>
      </div>
      
      <div className="mt-4">
        {places.length>0 && places.map(place => (
          <div className='flex mt-4 bg-gray-100 p-4 rounded-2xl' key={place._id}>
            <Link to={'/account/places/' + place._id} className="flex cursor-pointer gap-4">
              <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
                {place.photos.length > 0 && (
                  <img className="object-cover" src={'http://localhost:4000/uploads/' + place.photos[0]} alt="" />
                )}
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl">{place.title}</h2>
                <p className="text-sm mt-2">{place.description}</p>
              </div>
            </Link>

            <div className="flex w-32 h-32 bg-gray-300 grow shrink-0 rounded-2xl" onClick={(e) => handleDelete(e, place._id)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-11 mt-11 w-9 h-9">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
