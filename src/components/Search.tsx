import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { changeResultProps, CityResponse } from "../interfaces/search";
import api from "../services/api";

function Search({ onSearchChange }: any) {
  const [search, setSearch] = useState<changeResultProps>();

  const handleChange = (searchDate: any) => {
    setSearch(searchDate);
    onSearchChange(searchDate);
  };

  const loadOptions: any = (inputValue: string) => {
    return api
      .get(`?addressdetails=1&q=${inputValue}&format=json&limit=4`)
      .then((res: CityResponse) => {
        return {
          options: res.data.map((item) => {
            return {
              value: `${item?.lat} ${item?.lon}`,
              label: `${
                item?.address?.city || item?.address?.state
              }, ${item?.address?.country_code.toUpperCase()}`,
            };
          }),
        };
      })
      .then((res) => res)
      .catch((err) => console.log(err));
  };
  return (
    <AsyncPaginate
      placeholder="search for the city"
      value={search}
      onChange={handleChange}
      loadOptions={loadOptions}
      className='w-96'
    />
  );
}

export default Search;
