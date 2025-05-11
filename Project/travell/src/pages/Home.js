import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import './Home.css';

const destinations = [
    {
        name: "Paris, France",
        image: "https://i.pinimg.com/originals/fe/b2/56/feb2563c23da22b6ad381c25c4d4182a.jpg",
        description: "Experience the romance of Paris, visit the Eiffel Tower, and enjoy exquisite French cuisine."
    },
    {
        name: "Santorini, Greece",
        image: "https://lp-cms-production.imgix.net/2021-05/shutterstockRF_1563449509.jpg?auto=format&fit=crop&sharp=10&vib=20&ixlib=react-8.6.4&w=850&q=35&dpr=3",
        description: "A beautiful island with whitewashed buildings, blue-domed churches, and stunning sunsets."
    },
    {
        name: "Kyoto, Japan",
        image: "https://www.tripsavvy.com/thmb/e5wZDX6HW-JmfA8Yu0KEbCZ3zLo=/2121x1414/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-530105220-5c337bae46e0fb00012fcdfb.jpg",
        description: "Discover Japan's rich cultural heritage with its historic temples, cherry blossoms, and traditional tea houses."
    },
    {
        name: "Grand Canyon, USA",
        image: "https://th.bing.com/th/id/OIP.ZNryxGLnqTxelAcTGaGOaAHaF0?rs=1&pid=ImgDetMain",
        description: "Explore breathtaking landscapes and the stunning views of one of the world's greatest natural wonders."
    },
    {
        name: "Venice, Italy",
        image: "https://th.bing.com/th/id/OIP.nsPZJvenW2K7VGwoIOmpJgHaE7?rs=1&pid=ImgDetMain",
        description: "Take a romantic gondola ride through the canals of this iconic Italian city."
    }
];

const Home = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState([
        { 
            text: "Hi there! I'm your travel assistant. How can I help you plan your next adventure?", 
            sender: "bot" 
        }
    ]);
    const [inputMessage, setInputMessage] = useState("");

    const handleSendMessage = (e) => {
        e.preventDefault();
        
        if (inputMessage.trim() === "") return;
        
        // Add user message
        const newMessages = [...messages, { text: inputMessage, sender: "user" }];
        setMessages(newMessages);
        setInputMessage("");
        
        // Simulate bot response after a short delay
        setTimeout(() => {
            let botResponse = "Thanks for your message! I'd be happy to help you with travel information. Feel free to ask about any of our destinations.";
            
            // Simple keyword matching for demo purposes
            const input = inputMessage.toLowerCase();
            if (input.includes("paris")) {
                botResponse = "Paris is known as the City of Light and is famous for the Eiffel Tower, Louvre Museum, and exquisite cuisine. The best time to visit is April-June or September-October.";
            } else if (input.includes("santorini")) {
                botResponse = "Santorini is a beautiful Greek island known for its white buildings with blue domes. The best time to visit is from May to October.";
            } else if (input.includes("kyoto")) {
                botResponse = "Kyoto is famous for its traditional temples, gardens, and geisha culture. Cherry blossom season (late March to early April) is particularly beautiful.";
            } else if (input.includes("grand canyon") || input.includes("canyon")) {
                botResponse = "The Grand Canyon is best visited during spring or fall when temperatures are moderate. The South Rim is open all year, while the North Rim is seasonal.";
            } else if (input.includes("venice")) {
                botResponse = "Venice is known for its canals, gondolas, and historic architecture. Consider visiting in spring or fall to avoid summer crowds and winter flooding.";
            } else if (input.includes("hello") || input.includes("hi")) {
                botResponse = "Hello! How can I help with your travel plans today?";
            } else if (input.includes("thank")) {
                botResponse = "You're welcome! Feel free to ask if you have more questions about our destinations.";
            }
            
            setMessages(prev => [...prev, { text: botResponse, sender: "bot" }]);
        }, 800);
    };

    return (
        <div>
            <Navbar />
            <div className="home-container">
                <h1>Explore Beautiful Destinations</h1>
                <p>Discover the world's most stunning places and plan your next adventure!</p>
                <div className="destinations">
                    {destinations.map((place, index) => (
                        <div className="destination-card" key={index}>
                            <img src={place.image} alt={place.name} />
                            <h3>{place.name}</h3>
                            <p>{place.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chatbot Button */}
            <button
                className="chatbot-toggle"
                onClick={() => setIsChatOpen(!isChatOpen)}
            >
                {isChatOpen ? (
                    <span>&times;</span>
                ) : (
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                    </span>
                )}
            </button>

            {/* Chatbot Window */}
            {isChatOpen && (
                <div className="chatbot-container">
                    <div className="chatbot-header">
                        <div className="chatbot-title">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                                <line x1="9" y1="9" x2="9.01" y2="9"></line>
                                <line x1="15" y1="9" x2="15.01" y2="9"></line>
                            </svg>
                            <span>Travel Assistant</span>
                        </div>
                        <button 
                            className="chatbot-close" 
                            onClick={() => setIsChatOpen(false)}
                        >
                            &times;
                        </button>
                    </div>
                    <div className="chatbot-messages">
                        {messages.map((message, index) => (
                            <div 
                                key={index} 
                                className={`message ${message.sender}`}
                            >
                                {message.text}
                            </div>
                        ))}
                    </div>
                    <form className="chatbot-input" onSubmit={handleSendMessage}>
                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                        />
                        <button type="submit">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Home;