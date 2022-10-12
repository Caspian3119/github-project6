import { useEffect, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import Pin from "@mui/icons-material/LocationOn";
import Star from "@mui/icons-material/Star";
import "./App.css";
import axios from "axios";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  const localStorage = window.localStorage;
  const [currentUser, setCurrentUser] = useState(localStorage.getItem("user"));
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPin, setNewPin] = useState(null);
  const [place, setPlace] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);

  const [viewState, setViewState] = useState({
    latitude: 14.6500074,
    longitude: 121.1095448,
    zoom: 8,
  });
  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewState({ ...viewState, latitude: lat, longitude: long });
  };

  useEffect(() => {
    const getPins = async () => {
      try {
        axios.get("http://localhost:3000/api/pins").then((response) => {
          setPins(response.data);
        });
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  const handleAddClick = (e) => {
    const { lat, lng } = e.lngLat;
    setNewPin({
      lat: lat,
      lng: lng,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPins = {
      username: currentUser,
      place,
      desc,
      rating,
      lat: newPin.lat,
      long: newPin.lng,
    };
    try {
      const res = await axios.post("http://localhost:3000/api/pins", newPins);
      setPins([...pins, res.data]);
      setNewPin(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
    setShowLogin(true);
  };

  const handleDeletePin = (id) => {
    const currentPins = [...pins];
    axios.delete(`http://localhost:3000/api/pins/${id}`).then((response) => {
      const deletedPins = currentPins.filter((pins) => pins._id !== id);
      setPins(deletedPins);
    });
  };

  return (
    <div className="map-container">
      <Map
        {...viewState}
        transitionDuration="200"
        mapboxAccessToken="pk.eyJ1IjoiY2FzcGlhbjEwIiwiYSI6ImNsOHZuaTZhYzA0eDEzb3BsNnhtcDZrNTIifQ.KX9-HSWQIoGo5ffmBxXodg"
        mapStyle="mapbox://styles/caspian10/cl95e63bz000a14o4yn2wufdu"
        onMove={(evt) => setViewState(evt.viewState)}
        onDblClick={handleAddClick}
      >
        {pins.map((p) => (
          <>
            <Marker
              latitude={p.lat}
              longitude={p.long}
              offsetRight={-40}
              offsetTop={-40}
            >
              <Pin
                style={{
                  fontSize: 40,
                  color: p.username === currentUser ? "#B91646" : "#084594",
                  cursor: "pointer",
                }}
                onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
              />
            </Marker>
            {p._id === currentPlaceId && (
              <Popup
                latitude={p.lat}
                longitude={p.long}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setCurrentPlaceId(null)}
                anchor="left"
              >
                <div className="card">
                  <label>Place</label>
                  <h4 className="place">{p.place}</h4>
                  <label>Review</label>
                  <p className="desc">{p.desc}</p>
                  <label>Rating</label>
                  <div className="stars">
                    {Array(p.rating).fill(<Star className="star" />)}
                  </div>
                  
                  <label>Information</label>
                  <span className="username">
                    Created by <b>{p.username}</b>
                  </span>
                  {p.username === currentUser ? (
                    <button
                      onClick={() => handleDeletePin(p._id)}
                      className="delete-button"
                    >
                      Delete Pin
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </Popup>
            )}
          </>
        ))}
        {newPin && (
          <Popup
            latitude={newPin.lat}
            longitude={newPin.lng}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setNewPin(null)}
            anchor="left"
          >
            <div>
              <form onSubmit={handleSubmit}>
                <label>Place</label>
                <input
                  placeholder="Enter the name of the place"
                  onChange={(e) => setPlace(e.target.value)}
                />
                <label>Review</label>
                <input
                  placeholder="Say something"
                  onChange={(e) => setDesc(e.target.value)}
                />
                <label>Rating</label>
                <select onChange={(e) => setRating(e.target.value)}>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
                <button className="submit">Add Pin</button>
              </form>
            </div>
          </Popup>
        )}

        {currentUser ? (
          <button className="button logout" onClick={handleLogOut}>
            Log out
          </button>
        ) : (
          ""
        )}

        {showRegister && (
          <Register
            setShowRegister={setShowRegister}
            setShowLogin={setShowLogin}
          />
        )}
        {showLogin && (
          <Login
            setShowRegister={setShowRegister}
            setShowLogin={setShowLogin}
            localStorage={localStorage}
            setCurrentUser={setCurrentUser}
          />
        )}
      </Map>
    </div>
  );
}

export default App;
