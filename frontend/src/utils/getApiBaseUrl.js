const getApiBaseUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:8000';
  }
  return "https://todo-app-backend-green.vercel.app";
};
export default getApiBaseUrl;
