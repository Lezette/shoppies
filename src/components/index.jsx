import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


const Shoppies = () => {
    const [searchTerm, setSearchTerm] = useState('');
    return(
        <div className="md:w-7/12 m-auto py-10 px-5 md:px-0">
            <header className="mb-10">
                <h2 className="text-5xl font-medium">The Shoppies</h2>
            </header>
            <section className="shadow bg-gray-900 p-5 flex flex-col">
                <label>Movie Name</label>
                <div className="flex bg-gray-900 border border-gray-100 rounded p-2 my-5 items-center">
                    <FontAwesomeIcon icon={faSearch} className="w-auto" />
                    <input type="search" placeholder="Search.." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="focus:outline-none bg-transparent pl-3 w-full" />
                </div>
            </section>

            <section className="grid md:grid-cols-2 grid-cols-1 gap-5 my-10">
                <section className="bg-white text-black p-5 shadow-lg rounded">
                    <h3>Results for "{searchTerm}"</h3>

                    <div className="border border-gray-300 rounded md:w-8/12 w-11/12 mx-auto p-3 my-8">
                        <h5 className="text-xl">Movie Title</h5>
                        <p>Year of release</p>
                        <div className="text-right">
                        <button className="px-5 py-2 rounded-md bg-blue-300 focus:outline-none">
                            Nominate
                        </button>
                        </div>
                    </div>
                </section>
                <section className="bg-white text-black p-5 shadow-lg rounded">
                    <h3>Nominations</h3>

                    <div className="border border-gray-300 rounded md:w-8/12 w-11/12 mx-auto p-3 my-8">
                        <h5 className="text-xl">Movie Title</h5>
                        <p>Year of release</p>
                        <div className="text-right">
                        <button className="px-5 py-2 rounded-md bg-blue-300 focus:outline-none">
                            Nominate
                        </button>
                        </div>
                    </div>
                </section>
            </section>
        </div>
    )
}

export default Shoppies;