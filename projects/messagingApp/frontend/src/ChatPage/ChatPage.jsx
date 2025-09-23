import { useParams } from "react-router-dom";
import styles from "./ChatPage.module.css";

export default function ChatPage() {

    const params = useParams();

    return (
        `This is the page for ${params.chatName}`
    )
};