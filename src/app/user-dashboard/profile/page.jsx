"use client";

import { RiEdit2Line } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { bringUserInformation } from "@/app/redux/features/user/userActions";
import axios from "axios";

const UProfile = () => {
  const user = useSelector((state) => state.user.logedInUser);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (!user.userType) {
      router.replace("/auth");
    } else if (user.userType !== "customer") {
      router.replace("/");
    }
  }, []);

  const imageLoader = ({ src }) => {
    return src;
  };
  const [formData, setFormData] = useState({
    fullName: user.fullName,
    email: user.email,
    image: user.image,
    password: user.password,
    phone: user.phone
  });

  useEffect(() => {
    setFormData({
      fullName: user.fullName,
      email: user.email,
      image: user.image,
      password: user.password,
      phone: user.phone,
    });
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (formData.password !== confirmPassword) {
      console.error("Las contraseñas no coinciden");
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:3001/customers/${user.id}`,
        formData
      );

      dispatch(bringUserInformation(formData));

      if (response.status === 200) {
        console.log("Datos actualizados con éxito");
      }
    } catch (error) {
      console.error("Error al actualizar datos", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-secondary-100 p-8 rounded-xl w-full">
      <h1 className="text-4xl"> Mi perfil</h1>
      <hr className="my-8 border-gray-500" />
      <form onSubmit={handleUpdate}>
        <div className="flex items-center mb-6">
          <div className="w-1/4">
            <p>Foto de Pefil:</p>
          </div>
          <div className="flex-1">
            <div className="relative mb-2">
              <Image
                src={user.image}
                loader={imageLoader}
                width={80}
                height={80}
                alt={`${user.fullName} profile pic`}
              />

              <label
                htmlFor="avatar"
                className="absolute bg-secondary-900 p-2 left-24 -top-2 rounded-full cursor-pointer hover:bg-secondary-100"
              >
                <RiEdit2Line />
              </label>
              <input type="file" id="avatar" className="hidden" />
            </div>
            <p className="text-gray-500 text-sm">
              Extensiones permitidas: png, jpg, jpeg
            </p>
          </div>
        </div>
        <div className="flex items-center mb-4">
          <div className="w-1/4">
            <p>
              Nombre Completo: <span className="text-red-500">*</span>
            </p>
          </div>
          <div className="flex-1 flex items-center gap-4">
            <div className="w-1/2">
              <input
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full py-3 px-4 outline-none rounded-lg bg-secondary-900 cursor-default"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center mb-4">
          <div className="w-1/4">
            <p>
              Email: <span className="text-red-500">*</span>
            </p>
          </div>
          <div className="flex-1 flex items-center gap-4">
            <div className="w-1/2">
              <input
                name="email"
                type="text"
                value={formData.email}
                onChange={handleChange}
                className="w-full py-3 px-4 outline-none rounded-lg bg-secondary-900 cursor-default"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center mb-4">
          <div className="w-1/4">
            <p>Nueva Contraseña:</p>
          </div>
          <div className="flex-1">
            <input
              name="password"
              type={showPassword ? "text" : "password"} 
              value={formData.password}
              onChange={handleChange}
              className="w-full py-3 px-4 outline-none rounded-lg bg-secondary-900 cursor-default"
            />
        
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
            </span>
          </div>
        </div>

        
        <div className="flex items-center mb-4">
          <div className="w-1/4">
            <p>Confirmar Nueva Contraseña:</p>
          </div>
          <div className="flex-1">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full py-3 px-4 outline-none rounded-lg bg-secondary-900 cursor-default"
            />
          </div>
        </div>

        <button type="submit">BOTON GUARDAR CAMBIOS</button>
      </form>
    </div>
  );
};

export default UProfile;

