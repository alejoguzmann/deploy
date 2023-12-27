"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import BookingCard from "../../../components/bookingCard/BookingCard";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ModalDeleteAppointment from "../../../components/modal/ModalDeleteAppointment.jsx";
import {
  getAllAppointments,
  getUserById,
} from "../../redux/features/user/userActions";
import Link from "next/link";
import AdminCard from "../../../components/adminCard/AdminCard";
import { getAllArtists } from "../../redux/features/artists/artistActions";
import Card from "../../../components/card/Card";

export default function Reservas() {
  const user = useSelector((state) => state.user.logedInUser);
  const fireBaseUser = useSelector((state) => state.user.fireBaseUser);
  const artist = useSelector((state) => state.artists.people.slice(0, 3));

  const [appointment, setAppointment] = useState(user.appointments);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!user.userType) {
      router.replace("/auth");
    } else if (user.userType !== "customer") {
      router.replace("/");
    }
  }, []);

  useEffect(() => {
    dispatch(getAllArtists());
    dispatch(getUserById(fireBaseUser.tokenId));
  }, []);

  useEffect(() => {
    setAppointment(user.appointments);
  }, [user]);

  const isOpenModalDeleteAppointment = useSelector(
    (state) => state.ModalDeleteAppointment?.isOpen
  );

  useEffect(() => {
    dispatch(getAllAppointments(user.id));
  }, [isOpenModalDeleteAppointment]);

  return (
    <div className="bg-secondary-900 w-full rounded-xl shadow-lg shadow-primary/50">
      <div className="w-full p-7">
        <h1 className="text-4xl text-artistfont font-rocksalt mb-8">
          {" "}
          Mis turnos
        </h1>
        <hr className="border-primary/20 border-[1px]" />

        {appointment &&
          appointment.length > 0 &&
          user?.appointments &&
          user?.appointments.some(
            (tur) =>
              new Date(tur.dateAndTime) >= new Date() &&
              tur.paymentStatus != "rejected"
          ) && (
            <>
              <h4 className="text-artistfont text-center text-xl m-6 font-rocksalt">
                Próximos turnos
              </h4>
              {user?.appointments
                .filter((tur) => new Date(tur.dateAndTime) >= new Date())
                .sort(
                  (a, b) => new Date(a.dateAndTime) - new Date(b.dateAndTime)
                )
                .map((tur) => (
                  <div className="h-full flex items-center justify-center text-[#FDECDA] mt-3">
                    <BookingCard
                      id={tur.id}
                      bodyPlace={tur.bodyPlace}
                      description={tur.description}
                      duration={tur.duration}
                      image={tur.image}
                      size={tur.size}
                      dateAndTime={tur.dateAndTime}
                      depositPrice={tur.depositPrice}
                      tattooArtistId={tur.tattooArtistId}
                      paymentStatus={tur.paymentStatus}
                    />
                  </div>
                ))}
            </>
          )}

        {appointment &&
          appointment.length > 0 &&
          user?.appointments &&
          user?.appointments.some(
            (tur) =>
              new Date(tur.dateAndTime) < new Date() &&
              tur.paymentStatus != "rejected"
          ) && (
            <>
              <h4 className="text-artistfont text-center text-xl m-6 font-rocksalt">
                Turnos pasados
              </h4>
              {user?.appointments
                .filter((tur) => new Date(tur.dateAndTime) < new Date())
                .sort(
                  (a, b) => new Date(b.dateAndTime) - new Date(a.dateAndTime)
                )
                .map((tur) => (
                  <div className="h-full flex items-center justify-center text-[#FDECDA] mt-3">
                    <BookingCard
                      id={tur.id}
                      bodyPlace={tur.bodyPlace}
                      description={tur.description}
                      duration={tur.duration}
                      image={tur.image}
                      size={tur.size}
                      dateAndTime={tur.dateAndTime}
                      depositPrice={tur.depositPrice}
                      tattooArtistId={tur.tattooArtistId}
                      paymentStatus={tur.paymentStatus}
                    />
                  </div>
                ))}
            </>
          )}

        {appointment && appointment.length === 0 && (
          <div className="flex flex-col items-center">
            <div className="flex flex-col py-8 px-3 items-center justify-center">
              <h5 className="text-artistfont font-newrocker text-[22px] mb-8 text-center leading-7">
                No tienes ninguna reserva aún. ¡Descubre increíbles artistas y
                sus últimas obras!
              </h5>
              <Link href="/explore">
                <button className="border-primary border-[1.5px] hover:border-primary/60 text-primary text-[17px] py-3 px-4 rounded-lg">
                  Explorar Artistas
                </button>
              </Link>
            </div>

            <div className="scroll-fade flex justify-center items-center">
              <div>
                {artist?.map((filter) => (
                  <div
                    key={filter.id}
                    className="mb-4 w-full flex justify-center items-center   "
                  >
                    <Card
                      id={filter.id}
                      fullName={filter.fullName}
                      location={filter.location}
                      shopName={filter.shopName}
                      publications={filter.publications}
                      image={filter.image}
                      reviews={filter.reviews}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
