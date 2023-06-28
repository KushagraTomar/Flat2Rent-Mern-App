import { useState } from "react";
import Perks from "../Perks";
import PhotoUploader from "../PhotosUploader";
import AccountNav from "../AccountNav";
import { Navigate } from 'react-router-dom';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useEffect } from "react";

export default function PlacesFormPage() {
    const {id} = useParams();
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState("");
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [maxGuests, setMaxGuests] = useState(1);
    const [price, setPrice] = useState(100);
    const [redirect, setRedirect] = useState(false);
    useEffect(() => {
      if(!id) {
        return;
      }
      axios.get('http://localhost:4000/places/'+id).then(res => {
        const {data} = res;
        setTitle(data.title);
        setAddress(data.address);
        setAddedPhotos(data.photos);
        setDescription(data.description);
        setPerks(data.perks);
        setExtraInfo(data.extraInfo);
        setCheckIn(data.checkIn);
        setPrice(data.price);
        setCheckOut(data.checkOut);
        setMaxGuests(data.maxGuests);
      });
    }, [id])

    // function for displaying title
    function inputHeader(text) {
        return <h2 className="text-2xl mt-4">{text}</h2>;
    }

    // function for displaying description
    function inputDesciption(text) {
         return <p className="text-gray-500 text-sm">{text}</p>;
    }

    // function to call title and description function
    function preInput(header, description) {
        return (
        <>
            {inputHeader(header)}
            {inputDesciption(description)}
        </>
        );
    }

    async function savePlace(ev) {
        ev.preventDefault();
        const placeData = { price,
          title, address, addedPhotos,
          description, perks, extraInfo,
          checkIn, checkOut, maxGuests
        };
        if (id) {
          // update
          await axios.put('http://localhost:4000/places', {
            id, ...placeData
          });
          setRedirect(true);
        } else {
          // new place
          await axios.post('http://localhost:4000/places', {
            ...placeData  
          });
          setRedirect(true);
        }

        
    }

    if (redirect) {
        return <Navigate to={'/account/places'} />
    }

    return (
        <div>
          <AccountNav />
          <form onSubmit={savePlace}>
            {/* title section */}
            {preInput(
              "Title",
              "Title for your place. should be short and catchy as in advertisement"
            )}
            <input
              type="text"
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
              placeholder="title, for example: My lovely apt"
            />

            {/* address section */}
            {preInput("Address", "Address to this place")}
            <input
              type="text"
              value={address}
              onChange={(ev) => setAddress(ev.target.value)}
              placeholder="address"
            />

            {/* adding photos section */}
            {preInput("Photos", "more = better")}
            <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

            {/* place description section */}
            {preInput("Description", "description of the place")}
            <textarea
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
            />

            {/* perks section */}
            {preInput("Perks", "select all the perks of your place")}
            <div className="grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
              <Perks selected={perks} onChange={setPerks} />
            </div>

            {/* extra information section */}
            {preInput("Extra info", "house rules, etc")}
            <textarea
              value={extraInfo}
              onChange={(ev) => setExtraInfo(ev.target.value)}
            />

            {/* check in and check out section */}
            {preInput(
              "Personal Details",
              "add check in and out times, remember to have some time window for cleaning the room between guests"
            )}
            <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
              <div>
                <h3 className="mt-2 -mb-1">Check-in time</h3>
                <input
                  type="text"
                  value={checkIn}
                  onChange={(ev) => setCheckIn(ev.target.value)}
                  placeholder="00:00"
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Check-out time</h3>
                <input
                  type="text"
                  value={checkOut}
                  onChange={(ev) => setCheckOut(ev.target.value)}
                  placeholder="00:00"
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">No of occupants</h3>
                <input
                  type="number"
                  value={maxGuests}
                  onChange={(ev) => setMaxGuests(ev.target.value)}
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Price per month</h3>
                <input
                  type="number"
                  value={price}
                  onChange={(ev) => setPrice(ev.target.value)}
                />
              </div>
              
            </div>
            <div>
              <button className="primary my-4">Save</button>
            </div>
          </form>
        </div>
    );
}