import { useState } from "react";

const Header = () => {

    const [Name, setName] = useState("");

    return (


        <>

        <header className="w-full bg-gray-400 shadow-lg px-6 py-3 flex justify-center gap-4">

            <button className="px-5 py-2 bg-gray-800 text-white font-semibold rounded-md shadow">
                NEW LINE UP
            </button>
            <button className="px-5 py-2 bg-gray-800 text-white font-semibold rounded-md shadow">
                DAILY CARS
            </button>
            <button className="px-5 py-2 bg-gray-800 text-white font-semibold rounded-md shadow">
                TOP OF THE LINE
            </button>
            <button className="px-5 py-2 bg-gray-800 text-white font-semibold rounded-md shadow">
                SPECIAL OFFER
            </button>

            <label className="px-5 py-2 bg-gray-800 text-white font-semibold rounded-md shadow">
                MY ACCOUNT</label>
            <input type = "text"
            placeholder="Sign in"
            className="p-3 mb-3 border rounded"
            onChange={(e) => setName(e.target.value)}
            ></input>


<h1>{Name}</h1>
        </header>

        <section className="relative w-[90%] mx-auto mt-5 bg-white shadow-2xl">

            <div className="bg-gray-800 text-white w-40 h-40 flex items-center justify-center font-bold text-lg shadow-xl">
                RENTAL CARS
            </div>
                {/* NEED PA PICTURE*/}
            <div className="w-full h-56 overflow-hidden bg-black">
                <img src="" className="w-full opacity-90" />
            </div>

            <div className="w-full flex items-center justify-between py-10 px-10">

                <div className="text-4xl cursor-pointer">
                    ❮
                </div>
                {/* NEED PA PICTURE*/}
                <img src="" className="w-96 drop-shadow-xl" />

                <div className="text-4xl cursor-pointer">
                    ❯
                </div>

            </div>

            <div className="flex justify-center gap-6 mb-12">
                <button className="px-6 py-2 border-2 border-black rounded-md text-black font-semibold">
                    Show Details
                </button>
                <button className="px-6 py-2 border-2 border-black bg-gray-300 rounded-md text-black font-semibold">
                    Booking
                </button>
            </div>

        </section>

        <footer className="w-full bg-gray-400 mt-8 py-6 shadow-inner">
            <div className="w-[90%] mx-auto flex justify-between items-center">

                <p className="text-gray-800 mb-13">lightning mcqueen © 2025</p>

                <div className="flex items-center gap-5 text-2xl">
                    <i className="fa-facebook"></i>
                    <i className="facebook-messenger"></i>
                    <i className="instagram"></i>
                    <i className="x-twitter"></i>
                    <i className="whatsapp"></i>
                </div>

                <div className="flex gap-6 font-semibold">
                    <a href="#">Home</a>
                    <a href="#">Services</a>
                    <a href="#">About</a>
                    <a href="#">Terms</a>
                    <a href="#">Privacy Policy</a>
                </div>

            </div>
        </footer>

        </>
    );
};

export default Header;