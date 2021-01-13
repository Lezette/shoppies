import React, { useState, useEffect, useContext } from 'react';
import { NominationContext } from '../context/nomination';



const Nominations = () => {
    const [nominations, setNominations] = useContext(NominationContext);
    const [nominationList, setList] = useState([]);
    useEffect(() => {
        setList(Object.values(nominations));
    }, [nominations])

    const removeNomination = (id) => {
        const obj = nominations;
        console.log('obj', obj);
        delete obj[id];
        console.log('obj', obj);
        setNominations(() => {
            return {...obj}
        });
    };

    return (
        <React.Fragment>
            <h3>Nominations</h3>
                {nominationList.length !== 0 ? (
                    nominationList.map((list) => (
                        <div className="border border-gray-300 rounded w-11/12 mx-auto p-3 my-8 grid grid-cols-1 md:grid-cols-2 gap-3" key={list.imdbID}>
                        <div className="w-full">
                            <img src={list.Poster}  alt={list.Title} className="object-cover w-full h-32" />
                        </div>
                        <div>
                            <h5 className="text-xl">{list.Title}</h5>
                            <p>{list.Year}</p>
                            <div className="text-right">
                                <button className="px-5 py-2 rounded-md border border-blue-300 focus:outline-none" onClick={() => removeNomination(list.imdbID)}>
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            ): (
                <p className=" text-xs text-center py-5">You currently do not have any nominations</p>
            )}
        </React.Fragment>
    )
}

export default Nominations;