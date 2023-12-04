"use client";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  filterAllArtists,
  getAllArtists,
  OrderAllArtists,
} from "../../app/redux/features/artists/artistActions";
import { getAllStyles } from "../../app/redux/features/styles/stylesActions";

export default function FilterSideBar() {
  const dispatch = useDispatch();
  const styles = useSelector((state) => state.styles.names);
  const { people, filtered } = useSelector((state) => state.artists);

  const [artistOrder, setArtistOrder] = useState("");
  const [styleSelected, setStyleSelected] = useState([]);
  const [filters, setFilters] = useState({
    location: "",
    name: "",
    tattooStyle: [],
  });

  useEffect(() => {
    dispatch(filterAllArtists(filters));
  }, [filters]);

  const handleChange = (event) => {
    let value = event.target.value;
    setFilters({
      ...filters,
      [event.target.name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleStyleChange = (styleName) => {
    if (styleSelected.includes(styleName)) {
      setStyleSelected(styleSelected.filter((style) => style !== styleName));
    } else {
      setStyleSelected([...styleSelected, styleName]);
    }
  };

  

  const resetFilters = () =>{
    setFilters({
      location: "",
      name: "",
      tattooStyle: [],
    });
    setStyleSelected([]);
  }

  useEffect(() => {
    setFilters({ ...filters, tattooStyle: styleSelected });
  }, [styleSelected]);

  // useEffect(() => {
  //   dispatch(OrderAllArtists(artistOrder));
  // }, [artistOrder]);




  // const handleSortChange = (event) => {
  //   const order = event.target.value;
  //   setArtistOrder(order);
  // };

  return (
    <div>
      <div className="bg-secondary-900 p-4 flex flex-col transition-all pt-10">
        <h2 className="text-center text-[35px] font-bold mb-[50px] font-rocksalt">
          Filtros <span className="text-primary text-4xl">.</span>
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center w-full justify-center mb-8">
            <label
              className="text-[22px] font-weight:800 flex items-center px-4 py-1 justify-center font-newrocker"
              htmlFor="city"
            >
              Ciudad:
            </label>
            <input
              className="mb-8 w-[60%] bg-secondary-100 text-white/80 rounded-lg outline-none p-2"
              list="cities"
              id="city"
              name="location"
              onChange={handleChange}
              value={filters.location}
              placeholder="Buscar por ciudad"
              
            />
          </div>

          <div className="flex flex-col items-center justify-center mb-8">
            <label
              className="text-[22px] font-weight:800 flex items-center px-4 py-1 justify-center font-newrocker"
              htmlFor="name"
            >
              Nombre:
            </label>
            <input
              className="mb-8 w-[60%] bg-secondary-100 text-white/80 rounded-lg outline-none p-2"
              list="names"
              id="name"
              name="name"
              onChange={handleChange}
              value={filters.name}
              
              placeholder="Buscar por nombre"
            />
          </div>

          <div className="flex flex-col items-center justify-center mb-8">
            <label
              className="text-lg font-weight:800 flex items-center gap-4 px-4 py-1 justify-center mb-6 font-newrocker text-[22px]"
              htmlFor="style"
            >
              Estilo de Tatuaje:
            </label>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {styles.map((style) => {
                const isSelected = styleSelected.includes(style.name);
                return (
                  <label
                    className={`flex items-center gap-2 px-3 py-1 border font-newrocker rounded cursor-pointer ${
                      isSelected
                        ? "bg-primary/75 text-black border-primary border-[1px]"
                        : "bg-transparent border-[1px] border-primary text-primary rounded-lg"
                    }`}
                    htmlFor={style.name}
                    key={style.name}
                    onClick={() => handleStyleChange(style.name)}
                  >
                    {style.name}
                  </label>
                );
              })}
            </div>
          </div>
          <div className="flex justify-center items-center">
            <button onClick={resetFilters} className="font-newrocker w-[40%] border-[1px] border-primary text-[22px] rounded">
              Reiniciar Filtros
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
