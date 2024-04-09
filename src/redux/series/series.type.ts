import { Review } from '../../@types/reviews';
import { Status } from '../@types/enum';

type SeriesState = {
  status: Status,
  page: number
  pages: number
  isEnd: boolean
  series: Review[]
  id: string
};

export const initialState: SeriesState = {
  status: Status.fulfilled,
  page: 1,
  pages: 0,
  isEnd: false,
  series: [],
  id: '',
};