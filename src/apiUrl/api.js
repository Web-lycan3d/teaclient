/** @format */

const apiUrl = () => {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:5000";
  }
  if (process.env.NODE_ENV === "production") {
    return "https://obscure-fjord-91444.herokuapp.com";
  }
};
export default apiUrl;
