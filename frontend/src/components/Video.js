import ReactPlayer from "react-player";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Video({ setActive }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-500 bg-opacity-50 z-50">
            <div className="flex flex-row phone:w-96 desktop:w-2/3 phoneS:w-80 justify-center ">
                <ReactPlayer url="https://www.youtube.com/watch?v=PvB0kWs2IPQ" />
                <button
                    className="flex top-0 right-0 h-6"
                    onClick={() => setActive(false)}>
                    <FontAwesomeIcon
                        icon="fa-solid fa-xmark"
                        className="text-3xl ml-2 text-black"
                    />
                </button>
            </div>
        </div>
    );
}