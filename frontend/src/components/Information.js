import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Information({ icon, title, text }) {
    return (
        <div className="flex flex-col justify-center items-center m-4 ">
            <div className="text-orange-500 mb-4">
                <FontAwesomeIcon icon={icon} className="text-6xl" />
            </div>
            <span className="text-xl font-bold text-center mb-4">{title}</span>
            <span className="text-lg text-center">{text}</span>
        </div>
    );
}