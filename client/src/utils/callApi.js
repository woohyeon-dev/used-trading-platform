import axios from 'axios';

const callApi = async (requestType, router, data, setData, alert) => {
  router = router || '';
  data = data || {};
  setData = setData || function () {};
  alert = alert || function () {};

  const res = await axios[requestType](
    process.env.REACT_APP_URL + router,
    data,
    { withCredentials: true }
  );
  setData(res?.data);
  alert(res?.data.msg);
};

export default callApi;
