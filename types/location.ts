<<<<<<< HEAD
export type LocationType = 'beach' | 'mountains' | 'lake' | 'park';
export type Region = 'vinnytsia'
    | 'volyn'
    | 'dnipropetrovsk'
    | 'donetsk'
    | 'zhytomyr'
    | 'zakarpattia'
    | 'zaporizhzhia'
    | 'ivano-frankivsk'
    | 'kyiv'
    | 'kirovohrad'
    | 'luhansk'
    | 'lviv'
    | 'mykolaiv'
    | 'odesa'
    | 'poltava'
    | 'rivne'
    | 'sumy'
    | 'ternopil'
    | 'kharkiv'
    | 'kherson'
    | 'khmelnytskyi'
    | 'cherkasy'
    | 'chernivtsi'
    | 'chernihiv'
    | 'crimea';
=======
export interface Location {
  _id: string;
  image: string;
  name: string;
  locationType: string;
  region: string;
  rate: number;
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  ownerId: string;
  feedbacksId: string[];
}
export interface FetchLocationsParams  {
  page?: number;
  perPage?: number;
  search?: string;
  region?: string;
};
>>>>>>> main
