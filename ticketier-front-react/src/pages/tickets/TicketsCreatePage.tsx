import { useNavigate } from 'react-router-dom'
import BackButton from "../../components/back-button/BackButton"
import CreateTicketsForm from "../../components/create tickets form/CreateTicketsForm"

function TicketsCreatePage() {
    const navigate = useNavigate();

    const onSuccessHandler = () => {
        navigate("/tickets")
    }

    return (
    <div className="pageGeneralClass">
        <BackButton previousRoute="/tickets" />
        <h1 className="text-2xl sm:text-4xl font-bold my-8">Create Tickets</h1>
        <CreateTicketsForm onSuccessHandler={onSuccessHandler}/>
    </div>
    )
}

export default TicketsCreatePage