export const checkLength = (obj: Record<string, any>) => {
  for (let prop in obj) {
    if (typeof obj[prop] === 'object' && obj[prop] !== null) {
      checkLength(obj[prop]);
    } else if (typeof obj[prop] === 'string') {
      if (obj[prop].length === 0) {
        return false;
      }
    }
  }
  return true
}