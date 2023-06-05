import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Loading({ done, children }) {
    if (done) {
        return (
            <div className="animate-pulse flex justify-center items-center h-[70vh]">
                <FontAwesomeIcon icon="fas fa-spinner" className="text-secondary text-7xl  animate-spin" />
                <span className="text-secondary desktop:text-5xl phoneS:text-3xl pl-5">Loading...</span>
            </div>
        )
    }
    return children;
}
