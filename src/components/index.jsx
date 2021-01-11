import React, { useState, useEffect } from 'react';
import { Snackbar, IconButton, Typography, CardMedia, CardContent, CardActions, Card } from '@material-ui/core';
import {Close , Search} from '@material-ui/icons';
import axios from 'axios';


const Shoppies = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchList, setList] = useState([]);
    const [snackPack, setSnackPack] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const [messageInfo, setMessageInfo] = React.useState(undefined);
    const url = process.env.REACT_APP_API_BASE_URL;
    const apikey = process.env.REACT_APP_API_KEY;
    useEffect(() => {
        if(searchTerm !== '' && searchTerm.length > 2) {
            search(searchTerm);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm]);

    console.log('searchList', searchList);

    useEffect(() => {
        if (snackPack.length && !messageInfo) {
          setMessageInfo({ ...snackPack[0] });
          setSnackPack((prev) => prev.slice(1));
          setOpen(true);
        } else if (snackPack.length && messageInfo && open) {
          setOpen(false);
        }
      }, [snackPack, messageInfo, open]);
    
      const handleClick = (message) => () => {
        setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
      };
    
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };
    
      const handleExited = () => {
        setMessageInfo(undefined);
      };

      const handleChange = (e) => {
        setSearchTerm(e.target.value);
        setLoading(true);
      }

    const search = async (term) => {
        try {
            const encodedTerm = encodeURIComponent(term);
            const response = await axios.get(`${url}?s=${encodedTerm}&apikey=${apikey}&type=movie`)
            
            if(response.data.Response === "True") {
                setList(response.data);
            }else {
                handleClick("An error occured");
            }
            setLoading(false);
        } catch (error) {
            if (error.toString() === 'Error: Network Error') {
                handleClick('Please check your network connection and try again');
            }
           
            handleClick("An unknown error occured");
        }
    }

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

            <section className="grid md:grid-cols-2 grid-cols-1 gap-5 my-10">
                <section className="bg-white text-black p-5 shadow-lg rounded">
                    {searchTerm ? (
                        <>
                        <h3>Results for "{searchTerm}"</h3>

                        {!loading ? (
                            searchList.Response === "True" ? (
                                <div className="h-bg overflow-y-auto">
                                    {searchList.Search.map((list) => (
                                        <Card
                                            className="grid grid-cols-1 lg:grid-cols-2 gap-5 mx-auto p-3 my-8"
                                            variant="outlined"
                                            key={list.imdbID}
                                        >
                                           <CardMedia
                                                component="img"
                                                alt={list.Title}
                                                height="140"
                                                className="w-full"
                                                image={list.Poster}
                                                title={list.Title}
                                            />
                                            <div className={"flex flex-col"}>
                                                <CardContent>
                                                <Typography component="h5" variant="h5">
                                                    {list.Title}
                                                </Typography>
                                                <Typography variant="body1">
                                                    {list.Year}
                                                </Typography>
                                                </CardContent>
                                                <CardActions>
                                                <button className="px-5 py-2 rounded-md bg-blue-300 focus:outline-none">
                                                    Nominate
                                                </button>
                                                </CardActions>
                                            </div>
                                        </Card>
                                    ))}
                                    {/* <div className="text-right px-5">
                                        <button className="px-4 py-2 border border-gray-900 focus:outline-none mx-4"  onClick={setPage(page - 1)}><KeyboardArrowLeft /> Prev</button>
                                        <button className="px-4 py-2 bg-gray-900 text-white focus:outline-none mx-4" onClick={setPage(page + 1)}>Next <KeyboardArrowRight /></button>
                                    </div> */}
                                </div>
                            ) : (
                                <h2 className="text-2xl text-center py-10">Sorry! Couldn't find any movie. Please search again using another word.</h2>
                            )
                        ) : (
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
                        </>
                    ) : (
                        <>
                        <h2 className="text-2xl text-center py-10">Please Search for a movie</h2>
                        </>
                    )}
                </section>
                <section className="bg-white text-black p-5 shadow-lg rounded">
                    <h3>Nominations</h3>

                    <div className="border border-gray-300 rounded md:w-8/12 w-11/12 mx-auto p-3 my-8">
                        <h5 className="text-xl">Movie Title</h5>
                        <p>Year of release</p>
                        <div className="text-right">
                        <button className="px-5 py-2 rounded-md focus:outline-none bg-gray-200">
                            Remove
                        </button>
                        </div>
                    </div>
                </section>
            </section>

            <Snackbar
                key={messageInfo ? messageInfo.key : undefined}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                onExited={handleExited}
                message={messageInfo ? messageInfo.message : undefined}
                action={
                    <IconButton
                    aria-label="close"
                    color="inherit"
                    className="p-4"
                    onClick={handleClose}
                    >
                    <Close />
                    </IconButton>
                }
            />
        </div>
    )
}

export default Shoppies;
