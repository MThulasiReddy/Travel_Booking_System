import React from 'react';
import Navbar from '../components/Navbar';
import '../styles/MyTrips.css';

const tripEntries = [
  {
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Paris_Night.jpg",
    type: "Trip to Paris",
    date: "2024-12-20"
  },
  {
    image: "https://www.gannett-cdn.com/-mm-/2d3d27cfc8f9c24f4faca46696576085b98ab589/c=0-24-2749-1570/local/-/media/2021/03/29/USATODAY/usatsports/southwest-737-max-source-luv.jpg?width=2749&height=1546&fit=crop&format=pjpg&auto=webp",
    type: "Flight - Air France AF123",
    date: "2024-12-19"
  },
  {
    image: "https://th.bing.com/th/id/R.fb071770f83d99469698c26ea165e01e?rik=L8MdZnhhE4eonA&riu=http%3a%2f%2fmedia.architecturaldigest.com%2fphotos%2f57e42deafe422b3e29b7e790%2fmaster%2fpass%2fJW_LosCabos_2015_MainExterior.jpg&ehk=T5IeAh1xUTXOGrbKtfbg8dJDabe5Nquu660Eh3%2bi%2bdY%3d&risl=&pid=ImgRaw&r=0",
    type: "Hotel - Le Meurice",
    date: "2024-12-20 to 2024-12-25"
  },
  {
    image: "https://th.bing.com/th/id/OIP.8LIDvEBP2TgXthb9kEZ-HwHaC_?rs=1&pid=ImgDetMain",
    type: "Cab - Airport Pickup",
    date: "2024-12-20"
  },
  {
    image: "https://a.cdn-hotels.com/gdcs/production18/d1838/041ae6b1-0a88-4c22-a648-53a22dd4a006.jpg",
    type: "Trip to Santorini",
    date: "2025-01-05"
  },
  {
    image: "https://www.gannett-cdn.com/-mm-/2d3d27cfc8f9c24f4faca46696576085b98ab589/c=0-24-2749-1570/local/-/media/2021/03/29/USATODAY/usatsports/southwest-737-max-source-luv.jpg?width=2749&height=1546&fit=crop&format=pjpg&auto=webp",
    type: "Flight - Emirates EK210",
    date: "2025-01-04"
  }
];

const MyTrips = () => {
  return (
    <div className="trip-table-container">
      <h1>My Trips</h1>
      <table className="trip-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Image</th>
            <th>Type</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {tripEntries.map((trip, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <img src={trip.image} alt={trip.type} className="trip-img" />
              </td>
              <td>{trip.type}</td>
              <td>{trip.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyTrips;
