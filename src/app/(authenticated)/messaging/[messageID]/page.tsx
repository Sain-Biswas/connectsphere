import MessageBody from "./components/MessageBody";
import MessageFooter from "./components/MessageFooter";
import MessageHeader from "./components/MessageHeader";

interface paramInterface {
    messageID: string
}

const page = ({ params }: { params: paramInterface }) => {
    const { messageID } = params;

    return (
        <div>
            <div className="">
                <MessageHeader />
            </div>
            <div className="">
                <MessageBody />
            </div>
            <div>
                <MessageFooter />
            </div>
        </div>
    )
}

export default page