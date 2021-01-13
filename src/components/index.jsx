import React, { useState, useEffect, useContext } from 'react';
import { Search } from '@material-ui/icons';
import axios from 'axios';
import { NominationContext } from '../context/nomination';
import Nominations from './Nominations';


const Shoppies = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchList, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [nominations, setNominations] = useContext(NominationContext);
    const [nominationList, setNominationList] = useState([]);
    useEffect(() => {
        setNominationList(Object.values(nominations));
    }, [nominations]);
    const url = process.env.REACT_APP_API_BASE_URL;
    const apikey = process.env.REACT_APP_API_KEY;

    useEffect(() => {
        if(searchTerm !== '' && searchTerm.length > 2) {
            search(searchTerm);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm]);


      const handleChange = (e) => {
        setSearchTerm(e.target.value);
        setLoading(true);
      }

    const search = async (term) => {
        const encodedTerm = encodeURIComponent(term);
        const response = await axios.get(`${url}?s=${encodedTerm}&apikey=${apikey}&type=movie`);
        
        if(response.data.Response === "True") {
            setList(response.data);
        }
        setLoading(false);
    }

    const handleNomination = (id, property) => {
        if(nominations[id])  {
            return;
        }
        setNominations((prev) => {
            return { ...prev, [id]: property}
        });
    };

    const removeNomination = (id) => {
        const obj = nominations;
        console.log('obj', obj);
        delete obj[id];
        console.log('obj', obj);
        setNominations(() => {
            return {...obj}
        });
    };

    return(
        <div className="md:w-7/12 m-auto py-10 px-5 md:px-0 h-full">
            <header className="mb-10">
                <h2 className="text-5xl font-medium">The Shoppies</h2>
            </header>
            <section className="shadow bg-gray-900 p-5 flex flex-col">
                <label>Movie Name</label>
                <div className="flex bg-gray-900 border border-gray-100 rounded p-2 my-5 items-center">
                    <Search />
                    <input type="search" placeholder="Search.." value={searchTerm} onChange={handleChange} className="focus:outline-none bg-transparent pl-3 w-full" />
                </div>
            </section>
            {nominationList.length >= 5 && (

                <section className="my-6 bg-purple-400 p-5 rounded-sm">
                    <h2 className>Well done you now have {nominationList.length} nominations</h2>
                </section>
            )}

            <section className="grid md:grid-cols-2 grid-cols-1 gap-5 my-10">
                <section className="bg-white text-black p-5 shadow-lg rounded">
                    {searchTerm ? (
                        <React.Fragment>
                        <h3>Results for "{searchTerm}"</h3>

                        {!loading ? (
                            searchList.Response === "True" ? (
                                <div className="h-bg overflow-y-auto">
                                    {searchList.Search.map((list) => (
                                        <div className="border border-gray-300 rounded w-11/12 mx-auto p-3 my-8 grid grid-cols-1 md:grid-cols-2 gap-3" key={list.imdbID}>
                                            <div className="w-full">
                                                <img src={list.Poster}  alt={list.Title} className="object-cover w-full h-32" />
                                            </div>
                                            <div>
                                                <h5 className="text-xl">{list.Title}</h5>
                                                <p>{list.Year}</p>
                                                <div className="text-right">
                                                    {!nominations[list.imdbID] ? (
                                                        <button className="px-5 py-2 rounded-md bg-blue-300 focus:outline-none" onClick={() => handleNomination(list.imdbID, list)}>
                                                            Nominate
                                                        </button>
                                                    ) : (
                                                        <button className="px-5 py-2 rounded-md border border-blue-300 focus:outline-none" onClick={() => removeNomination(list.imdbID)}>
                                                            Remove
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        
                                    ))}
                                    {/* <div className="text-right px-5">
                                        <button className="px-4 py-2 border border-gray-900 focus:outline-none mx-4"  onClick={setPage(page - 1)}><KeyboardArrowLeft /> Prev</button>
                                        <button className="px-4 py-2 bg-gray-900 text-white focus:outline-none mx-4" onClick={setPage(page + 1)}>Next <KeyboardArrowRight /></button>
                                    </div> */}
                                </div>
                            ) : (
                                <h2 className="text-2xl text-center py-10">Sorry! Couldn't find any movie. Please search again using another word.</h2>
                            )) : (
                            <div className="rounded-md p-4 max-w-sm w-full mx-auto my-8">
                                <div className="animate-pulse flex space-x-4">
                                    <div className="rounded-full bg-blue-200 h-12 w-12"></div>
                                        <div className="flex-1 space-y-4 py-1">
                                            <div className="h-4 bg-blue-200 rounded w-3/4"></div>
                                            <div className="space-y-2">
                                                <div className="h-4 bg-blue-200 rounded"></div>
                                                <div className="h-4 bg-blue-200 rounded w-5/6"></div>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                                
                        )}
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                        <h2 className="text-2xl text-center py-10">Please Search for a movie</h2>
                        </React.Fragment>
                    )}
                </section>
                <section className="bg-white text-black p-5 shadow-lg rounded">
                    <Nominations />
                </section>
            </section>
        </div>
    )
}

export default Shoppies;
