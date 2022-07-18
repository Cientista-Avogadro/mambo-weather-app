export interface OptionsResponse{
  lat: number;
  lon: number;
  address:{
    city: string;
    state:string
    country_code: string;
  }
}

export interface changeResultProps{
  value:string;
  label:string
}

export interface CityResponse{
  data:[
    OptionsResponse
  ]
}