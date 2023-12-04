"use client"
import React from 'react'
import AdminCard from "@/components/adminCard/AdminCard";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { getAllArtists } from '@/app/redux/features/artists/artistActions';
import { useState } from 'react';
import Paginate from '@/components/paginate/Paginate';

const RegisteredArtist = () => {
  const { people, filtered } = useSelector((state) => state.artists);
  const dispatch = useDispatch();

    useEffect(() => {
    dispatch(getAllArtists());
  }, []);

  //paginado
  const [currentPage, setCurrentPage] = useState(1);
  const artistsPerPage = 5;
  const indexOfLastArtist = currentPage * artistsPerPage;
  const indexOfFirstArtist = indexOfLastArtist - artistsPerPage;
  const artistsToDisplay = filtered.slice(
    indexOfFirstArtist,
    indexOfLastArtist
  );
  console.log(artistsToDisplay);
  const totalArtists = filtered.length;
  console.log(totalArtists);
  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      

      <div className="scroll-fade md:w-3/4 flex flex-wrap gap-x-2">
              <div className="scroll-content w-full">
                
              <div className="scroll-fade flex flex-1 flex-wrap gap-x-2">
              <div className="scroll-content w-full">
                <Paginate
                  artistsPerPage={artistsPerPage}
                  totalArtists={totalArtists}
                  currentPage={currentPage}
                  onPageChange={onPageChange}
                />
               
                

      <div className="scroll-fade md:w-3/4 ">
              <div >
                {filtered?.map((filter) => (
                  <div key={filter.id} className="mb-4 w-full  ">


                        <AdminCard
                          key={filter.id}
                          id={filter.id}
                          name={filter.name}
                          lastName={filter.lastName}
                          location={filter.location}
                          shopName={filter.shopName}
                          tattoos={filter.publications}
                          image={filter.image}
                        />
                      </div>
                ))}

                {/* {filtered?.map((filter) => (
                  <div key={filter.id} className="mb-4 w-full ">
                    <AdminCard
                      key={filter.id}
                      id={filter.id}
                      name={filter.name}
                      lastName={filter.lastName}
                      location={filter.location}
                      shopName={filter.shopName}
                      tattoos={filter.publications}
                      image={filter.image}
                    />
                  </div>
                ))} */}
              </div>
            </div>
            </div>
            </div>

            
    </div>
    </div>

            </div>
            

  
  )
}

export default RegisteredArtist