import {
  getUser,
  cleanUser,
  getFirebaseInfo,
  cleanFireBaseInfo,
  getUserPosts,
} from "./userSlice";
import axios from "axios";

const URL_BASE = "https://serverconnectink.up.railway.app";

export const getUserById = (tokenId, router) => async (dispatch) => {
  try {
    const response = await axios.post(`${URL_BASE}/auth`, {
      tokenId,
    });

    dispatch(getUser(response.data));

    // Guardar en localStorage después de recibir la respuesta
    localStorage.setItem("user", JSON.stringify(response.data));
  } catch (error) {
    if (router) {
      router.replace("/auth/register");
    }
    console.error(error);
  }
};

export const logOut = () => async (dispatch) => {
  dispatch(cleanUser());
  dispatch(cleanFireBaseInfo());

  // Guardar objetos vacíos en localStorage
  localStorage.setItem("user", JSON.stringify({}));
  localStorage.setItem("fireBaseUser", JSON.stringify({}));
};

export const getUserInformation = (user) => async (dispatch) => {
  dispatch(getFirebaseInfo(user));

  // Guardar en localStorage
  localStorage.setItem("fireBaseUser", JSON.stringify(user));
};

export const bringUserPosts = (id) => async (dispatch) => {
  try {
    const response = await axios.post(`${URL_BASE}/publications/tattooArtistId`, {
      id,
    });

    dispatch(getUserPosts(response.data));

    // Guardar en localStorage si es necesario
    // (depende de tu lógica específica)
  } catch (error) {
    console.error(error);
  }
};