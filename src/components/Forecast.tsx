
import { useLayoutEffect } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function Forecast({ data }: any) {
  const dayInWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInWeek)
  );


  return (
    <div className="flex flex-col items-center">
      <label htmlFor="" className="my-6 block align-middle text-gray-300 text-3xl">
        Próximos Dias
      </label>
      <Accordion allowZeroExpanded  className="w-[600px] ">
        {data?.list?.splice(0, 7).map((item: any, idx: number) => {
          return (
            <AccordionItem key={idx}>
              <AccordionItemHeading>
                <AccordionItemButton className="grid bg-gray-900 rounded grid-cols-4 text-gray-200 py-2 px-4 cursor-pointer items-center justify-center">
                  <img
                    src={`src/assets/icons/${item?.weather[0].icon}.png`}
                    alt="weather forecast"
                    className="w-[40px] h-[40px]"
                  />
                  <label htmlFor="" className="text-orange-700">
                    {forecastDays[idx]}
                  </label>
                  <label htmlFor="" className="text-yellow-700">
                    {item.weather[0].description}
                  </label>
                  <label htmlFor="" className="text-gray-300">
                    {Math.round(item.main.temp_min)}°C /{" "}
                    {Math.round(item.main.temp_max)}°C
                  </label>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <div className="flex justify-between">
                  <div className="flex flex-col gap-2 " >
                    <div >
                      <label htmlFor="" className="text-orange-700">Pressão</label>
                      <p>{item?.main.pressure}hPa</p>
                    </div>
                    <div>
                      <label htmlFor="" className="text-orange-700">Humidade</label>
                      <p>{item?.main.humidity}%</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 " >
                    <div>
                      <label htmlFor="" className="text-orange-700">Nuvens</label>
                      <p>{item?.clouds.all}%</p>
                    </div>
                    <div>
                      <label htmlFor="" className="text-orange-700">Vel. vento</label>
                      <p>{item?.wind.speed} m/s</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 " >
                    <div>
                      <label htmlFor="" className="text-orange-700">Sea Level</label>
                      <p>{item?.main.sea_level}m</p>
                    </div>
                    <div>
                      <label htmlFor="" className="text-orange-700">Feels Like</label>
                      <p>{Math.round(item?.main.feels_like)}°C</p>
                    </div>
                  </div>
                </div>
              </AccordionItemPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}

export default Forecast;
