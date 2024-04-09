import { Review } from '../../@types/reviews';
import { Status } from '../@types/enum';

type RegistrationState = {
  status: Status,
  page: number
  pages: number
  isEnd: boolean
  comments: Review[]
};

export const initialState: RegistrationState = {
  status: Status.fulfilled,
  page: 1,
  pages: 0,
  isEnd: false,
  comments: []
};