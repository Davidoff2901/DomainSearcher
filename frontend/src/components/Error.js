export default function Error({ error }) {
    if (error) {
        return <span className="text-red-600 text-lg text-center">{error}</span>
    }
    return
}