import { PopulatedLocation } from './location';

export type Review = {
  id: string;
  rating: number;
  text: string;
  authorName: string;
  locationName: string;
};

export type FeedbackItem = {
  _id: string;
  rate: number;
  description?: string;
  userName?: string;
  locationId?: PopulatedLocation | string;
};
