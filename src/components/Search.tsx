import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { changeResultProps } from "../interfaces/search";
import api from "../services/api";

function Search({ onSearchChange }: any) {
  const [search, setSearch] = useState<changeResultProps>();

  const handleChange = (searchDate: any) => {
    setSearch(searchDate);
    onSearchChange(searchDate);
  };

  const loadOptions: any = async (inputValue: string) => {
    try {
      const res = await api
        .get(`?addressdetails=1&q=${inputValue}&format=json&limit=5`);
      const res_1 = {
        options: res.data.map((item:any) => {
          
          return {
            value: `${item?.lat} ${item?.lon}`,
            label: `${item?.display_name ||item?.address?.city || item?.address?.state}, ${item?.address?.country_code.toUpperCase()}`,
          };
        }),
      };
      return res_1;
    } catch (err) {
      return console.log(err);
    }
  };
  return (
    <AsyncPaginate
      placeholder="Pesquise aqui a sua Cidade"
      value={search}
      onChange={handleChange}
      loadOptions={loadOptions}
      className='w-96'
    />
  );
}

export default Search;
