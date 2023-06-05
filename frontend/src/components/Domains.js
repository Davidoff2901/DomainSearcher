export default function Domains({ img, price, discount, text }) {
    return (
        <div className="my-4 flex flex-col items-center">
            <img alt="" src={img} className="w-[115px] h-[64px] bg-white border border-gray-400 "></img>
            <span className="w-52">
                <span className="text-lg text-center">
                    <span className="line-through">
                        <span className="text-[12px]">$</span>
                        {price}/yr
                    </span>
                    <span className="text-orange-500 font-bold text-lg">
                        <span className="text-[12px]">$ </span>
                        {discount}/1st yr
                    </span>
                </span>
            </span>
            <span className="w-48 text-lg text-center">{text}</span>
        </div>
    );
}