import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TicketCreateDto } from '../../typings/Ticket';
import CustomSpinner from '../spinner/CustomSpinner';
import axios from 'axios';

interface Props {
    onSuccessHandler: () => void;
}

const CreateTicketsForm = ({ onSuccessHandler }: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const form = useForm<TicketCreateDto>();
    const { register, handleSubmit, formState, reset } = form;
    const { errors } = formState;

    const onSubmitFunction = async (data: TicketCreateDto) => {
        try {
            setLoading(true);
            // Adjust the data payload to match the backend's expected format
            const payload = {
                tick_time: data.time,
                passenger_name: data.passenger_name,
                passenger_ssn: data.passengerSSN,
                source: data.from,
                destination: data.to,
                price: data.price,
            };
            const response = await axios.post(
                'https://ethical-antelope-rockgtargames24-f3b69411.koyeb.app/create',
                payload
            );
            console.log('Ticket created:', response.data);
            onSuccessHandler();
        } catch (error) {
            console.error('Error creating ticket:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading && <CustomSpinner />}
            <form
                onSubmit={handleSubmit(onSubmitFunction)}
                className="border-2 border-gray-200 w-[400px] max-w-full mx-auto"
                noValidate
            >
                <div className="m-4">
                    <label className="text-slate-500">Ticket Time</label>
                    <input
                        type="datetime-local"
                        {...register('time', {
                            required: 'Ticket Time is Required',
                        })}
                    />
                    <span className="bg-red-200 text-red-600">{errors?.time?.message}</span>
                </div>
                <div className="m-4">
                    <label className="text-slate-500">Passenger Name</label>
                    <input
                        type="text"
                        autoComplete="off"
                        {...register('PassengerName', {
                            required: 'Passenger Name is Required',
                        })}
                    />
                    <span className="bg-red-200 text-red-600">{errors?.passenger_name?.message}</span>
                </div>
                <div className="m-4">
                    <label className="text-slate-500">Passenger SSN</label>
                    <input
                        type="number"
                        {...register('PassengerSSN', {
                            required: 'Passenger SSN is Required',
                        })}
                    />
                    <span className="bg-red-200 text-red-600">{errors?.passengerSSN?.message}</span>
                </div>
                <div className="m-4">
                    <label className="text-slate-500">Source (From)</label>
                    <input
                        type="text"
                        autoComplete="off"
                        {...register('from', {
                            required: 'Source (From) is Required',
                        })}
                    />
                    <span className="bg-red-200 text-red-600">{errors?.from?.message}</span>
                </div>
                <div className="m-4">
                    <label className="text-slate-500">Destination (To)</label>
                    <input
                        type="text"
                        autoComplete="off"
                        {...register('to', {
                            required: 'Destination (To) is Required',
                        })}
                    />
                    <span className="bg-red-200 text-red-600">{errors?.to?.message}</span>
                </div>
                <div className="m-4">
                    <label className="text-slate-500">Ticket Price</label>
                    <input
                        type="number"
                        autoComplete="off"
                        {...register('price', {
                            required: 'Ticket Price is Required',
                        })}
                    />
                    <span className="bg-red-200 text-red-600">{errors?.price?.message}</span>
                </div>
                <div className="flex justify-between items-center">
                    <button
                        className="bg-sky-800 text-white px-4 py-2 mx-8 my-2 rounded-lg"
                        type="submit"
                    >
                        Submit
                    </button>
                    <button
                        className="bg-orange-600 text-white px-4 py-2 mx-8 my-2 rounded-lg"
                        type="button"
                        onClick={() => reset()}
                    >
                        Reset Form
                    </button>
                </div>
            </form>
        </>
    );
};

export default CreateTicketsForm;
