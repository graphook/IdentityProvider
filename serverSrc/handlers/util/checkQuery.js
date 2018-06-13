
export default function checkQuery(requirements, query) {
  for (let i = 0; i < requirements.length; i++) {
    if (query[requirements[i]] === null) {
      return requirements[i]
    }
  }
  return null;
}
