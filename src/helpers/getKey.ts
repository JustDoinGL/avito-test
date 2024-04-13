import { RatingLint } from '../helpers/const'

export const getRatingKey = (ratingValue: RatingLint | undefined): string | null => {
  if (ratingValue === undefined || ratingValue === RatingLint.Start) {
    return null
  }
  const entries = Object.entries(RatingLint) as [string, RatingLint][]
  const foundEntry = entries.find(([, value]) => value === ratingValue)
  return foundEntry ? foundEntry[0] : null
}

export const isStart = (ratingValue: any, start: any) => {
  if (ratingValue === undefined || ratingValue === start) {
    return null
  } else {
    return ratingValue
  }
}
