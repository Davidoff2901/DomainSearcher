import { useState, useEffect, useContext } from "react";
import { CartStorageContext } from "../helpers/Contexts";

export default function DomainRow({ domainSearch, tld, status, price, periods }) {
    const { cartArray, setCartArray } = useContext(CartStorageContext);
    const [ordered, setOrdered] = useState(false)

    function checkIfExists(domain) {
        for (let i = 0; i < cartArray.length; i++) {
            if (cartArray[i][0] === domain) {
                setOrdered(true)
            }
        }
    }
    function addDomainForPurchase(domain, price) {
        for (let i = 0; i < cartArray.length; i++) {
            if (cartArray[i][1] === domain) {
                return;
            }
        }
        setOrdered(true)
        cartArray.push([domain, price, status, periods, 1, 0])
        localStorage.setItem("domains", JSON.stringify(cartArray));
        setCartArray(JSON.parse(localStorage.getItem("domains")))
    }
    function buttonText(status) {
        if (ordered) {
            return "Ordered";
        }
        else return status;
    }
    function buttonColor(status) {
        if (ordered) {
            return "bg-[#5cb0ff]";
        }
        else if (status === "Register") {
            return "bg-[#14A52E]";
        }
        else if (status === "Transfer") {
            return "bg-[#C12626]";
        }
    }
    useEffect(() => {
        checkIfExists(`${domainSearch}.${tld}`);
    })
    return (
        <tr className={" " + (status === "Transfer" ? "bg-[#eef4f9]" : "bg-white")}>
            <td className="text-center desktop:text-lg phoneS:text-[14px] p-2" >
                <span className="break-all">{domainSearch}<span className="font-bold">.{tld}</span></span>
            </td>
            <td className="text-center desktop:text-lg">
                {status}
            </td>
            <td className="text-center flex justify-center items-center py-2">
                <span className="text-[14px] w-24">$<span className="desktop:text-xl phoneS:text-sm">{price}</span>/year</span>
                <button onClick={() => addDomainForPurchase(`${domainSearch}.${tld}`, price)} disabled={ordered ? true : false} className={"p-2 border rounded-lg ml-3 desktop:text-lg phoneS:text-[12px] text-white desktop:w-32 mobileDevices:w-24 disabled:opacity-50 " + (buttonColor(status))}>
                    {buttonText(status).toUpperCase()}
                </button>
            </td>
        </tr>
    )
}