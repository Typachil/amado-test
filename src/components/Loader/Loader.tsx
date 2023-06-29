import './Loader.css';
import { useAppSelector } from "../../hooks/redux";

const Loader = () => {
    const { isLoading } = useAppSelector((state) => state.reducerProducts);

    return (
        <>
            {isLoading && 
            <div className="loader">
                <div className="loader__rings"></div>
            </div>} 
        </>
    )
};

export default Loader;