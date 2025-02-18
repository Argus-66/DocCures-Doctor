import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addAppointments } from "../redux/AppointmentSlice.mjs";

const serverUrl = import.meta.env.VITE_DOCCURES_SERVER_URL;

let useAppointments = () => {
    let [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    let dispatch = useDispatch();
    let { email } = useSelector(state => state.doctor)


    let fetchAppointments = async () => {
        try {
            setIsLoading(true);
            let response = await fetch(`${serverUrl}/user/getAppointments?type=Doctor&email=${encodeURIComponent(email)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            let data = await response.json();
            setAppointments(data.appointments);

            if (data.appointmentsFound) {
                dispatch(addAppointments(data.appointments));
                console.log('Appointments:', data.appointments);

            }
        } catch (error) {
            console.error('Error in authStatus:', error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchAppointments();
    }, []);

    return { appointments, isLoading, error };
}

export default useAppointments;