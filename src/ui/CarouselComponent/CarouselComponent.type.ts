import { Photo } from "../../@types/photoFilms"

export type CarouselComponentProps = {
  content: Photo[]
  beforeChange: () => void
}