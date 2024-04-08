import { Photo } from "../../@types/photoFilms"
import { Status } from "../@types/enum"

type FilmsState = {
	photo: Photo[]
	status: Status
	total: number
	isEnd: boolean
	page: number
}


export const initialState: FilmsState = {
	photo: [],
	status: Status.pending,
	total: 0,
	isEnd: false,
	page: 1,
}

