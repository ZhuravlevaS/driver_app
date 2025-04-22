import {useEffect, useState} from 'react'
import {Api} from "../api.ts";
import {Loader} from "../components/Loader.tsx";
import {ApiResponseType, ErrorResponseType} from "../types/apiTypes.ts";
import {DriverShiftTypes} from "../types/driverShiftTypes.ts";
import VehicleCheckForm from "../components/VehicleCheckForm.tsx";
import {ErrorMessage} from "../components/ErrorMessage.tsx";

const driverId = "123";

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ApiResponseType<DriverShiftTypes> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Api.get(`/driver-shift?driverId=${driverId}`)
      .then((dataResponse) => {
        if (dataResponse.isError) {
          const err = dataResponse.data as ErrorResponseType;
          setError(err.message);
        } else {
          setData(dataResponse as ApiResponseType<DriverShiftTypes>)
        }
      })
      .catch(() => {
        setError('Something went wrong');
      })
      .finally(() => {
        setLoading(false)
      })
  }, [driverId]);


  if (loading && !error) return <Loader text={'Loading your data...'} />;

  if (error) return <ErrorMessage text={error} />

  if (data) return <VehicleCheckForm />;
}

export default App
