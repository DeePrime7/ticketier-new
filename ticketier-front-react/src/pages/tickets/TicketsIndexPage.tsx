import { useState, useEffect } from "react";
import BackButton from "../../components/back-button/BackButton";
import { Link } from "react-router-dom";
import { AiOutlinePlusSquare } from "react-icons/ai";
import axios from "axios";
import moment from "moment";
import CustomSpinner from "../../components/spinner/CustomSpinner";

interface Ticket {
  id: number;
  tick_time: string;
  passenger_name: string;
  source: string;
  destination: string;
  price: string;
}

const TicketsIndexPage = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getTickets = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get<Ticket[]>("/all=ticket");
      setTickets(data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTickets();
  }, []);

  const NoDataContent = (
    <div className="text-center text-3xl">No Tickets Found</div>
  );

  const TicketsContent = (
    <table className="w-full">
      <thead className="bg-gray-100 p-2">
        <tr>
          <th className="text-center">Id</th>
          <th className="text-center">Passenger Name</th>
          <th className="text-center max-lg:hidden">Source</th>
          <th className="text-center max-lg:hidden">Destination</th>
          <th className="text-center">Price</th>
          <th className="text-center">Time</th>
          <th className="text-center">Operation</th>
        </tr>
      </thead>
      <tbody className="bg-sky-100">
        {tickets.map((ticket) => (
          <tr
            key={ticket.id}
            className="border-2 border-gray-200 h-12 hover:bg-sky-400 transition-all duration-200"
          >
            <td className="text-center">{ticket.id}</td>
            <td className="text-center">{ticket.passenger_name}</td>
            <td className="text-center max-lg:hidden">{ticket.source}</td>
            <td className="text-center max-lg:hidden">{ticket.destination}</td>
            <td className="text-center">{ticket.price}</td>
            <td className="text-center">
              {moment(ticket.tick_time).isValid()
                ? moment(ticket.tick_time).format("YYYY-MM-DD [at] HH:mm")
                : "Invalid Date"}
            </td>
            <td className="text-center">
              <Link to={`/tickets/${ticket.id}`} className="bg-green-600 p-1 rounded-md mx-1">
                Details
              </Link>
              <Link
                to={`/tickets/edit/${ticket.id}`}
                className="bg-yellow-600 p-1 rounded-md mx-1 max-md:hidden"
              >
                Edit
              </Link>
              <Link
                to={`/tickets/delete/${ticket.id}`}
                className="bg-red-600 p-1 rounded-md mx-1 max-md:hidden"
              >
                Delete
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="pageGeneralClass">
      <BackButton previousRoute="/" />

      <div className="flex justify-between items-center">
        <h1 className="text-2xl sm:text-4xl font-bold my-8">Tickets List</h1>
        <Link to="/tickets/create">
          <AiOutlinePlusSquare className="text-4xl text-blue-600" />
        </Link>
      </div>

      {/* Render tickets or loading state */}
      {loading ? <CustomSpinner /> : tickets.length === 0 ? NoDataContent : TicketsContent}
    </div>
  );
};

export default TicketsIndexPage;
