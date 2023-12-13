"use client";
import React from 'react'
import AdminCardSuspended from '../../../components/adminCardSuspended/AdminCardSsuspended';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { getAllArtists } from '../../../app/redux/features/artists/artistActions';
import { useState } from 'react';
import PaginateAdmin from '../../../components/paginateAdmin/PaginateAdmin';
import { useRouter } from 'next/navigation';
import { getDisabledArtists } from "../../redux/features/artists/artistActions"


const Suspended = () => {

  const { people, filtered } = useSelector((state) => state.artists);
  const user = useSelector((state) => state.user.logedInUser)
  const dispatch = useDispatch();
  const router = useRouter()
  const disabledArtists = useSelector((state) => state.artists.disabled);
  
    useEffect(() => {
      if(!user.userType){
        router.replace("/auth")
      } else if (user.userType !== "admin"){
        router.replace("/")
      }
    dispatch(getDisabledArtists());
    dispatch(getAllArtists());
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const artistsPerPage = 5;
  const indexOfLastArtist = currentPage * artistsPerPage;
  const indexOfFirstArtist = indexOfLastArtist - artistsPerPage;
  const artistsToDisplay = disabledArtists.slice(
    indexOfFirstArtist,
    indexOfLastArtist
  );

  const totalArtists = filtered.length;
 
  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div>
       {/* <PaginateAdmin
          artistsPerPage={artistsPerPage}
          totalArtists={totalArtists}
          currentPage={currentPage}
          onPageChange={onPageChange}
        /> */}
        <div className="scroll-fade flex justify-center items-center">
          <div >
            {artistsToDisplay?.map((filter) => (
              <div key={filter.id} className="mb-4 w-full flex justify-center items-center   ">
                <AdminCardSuspended
                    key={filter.id}
                    id={filter.id}
                    fullName={filter.fullName}
                    location={filter.location}
                    shopName={filter.shopName}
                    tattoos={filter.publications}
                    image={filter.image}
                    reviews={filter.reviews}
                    email={filter.email}
                  />
              </div>
           ))}
          </div>
        </div>
    </div>
  );
};

export default Suspended;
