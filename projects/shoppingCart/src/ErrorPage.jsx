import { Link } from "react-router-dom";

const ErrorPage = ({count}) => {
     return  (
        <>
            this is error page 
            <br /> 
            <Link to={"/"}>go back to home</Link>
        
        </>

    )
    
}

export default ErrorPage