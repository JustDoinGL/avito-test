import { Series } from '../../@types/series';
import { Status } from '../@types/enum';

type SeriesState = {
  status: Status,
  page: number
  pages: number
  total: number
  isEnd: boolean
  series: Series[]
  id: string
};

export const initialState: SeriesState = {
  status: Status.fulfilled,
  page: 1,
  pages: 0,
  total: 0,
  isEnd: false,
  series: [],
  id: '',
};