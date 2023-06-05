import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import OrderDetails from "../components/OrderDetails";
import Active from "../components/Active";
import $ from "jquery"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CartStorageContext } from "../helpers/Contexts";
import { useQuery } from "@tanstack/react-query";

export function getPlans() {
    return new Promise((resolve) => {
        $.ajax({
            url: 'https://api.tovanqmadaezaeto.com/server.php',
            method: 'GET',
            data: {
                getPlans: 1
            },
            success: function (response) {
                response = JSON.parse(response);
                resolve(Object.entries(response[1]["plans"].slice(0, 5)));
            },
            dataType: 'text'
        })
    })
}
export function getCountries() {
    return new Promise((resolve) => {
        $.ajax({
            url: 'https://api.tovanqmadaezaeto.com/server.php',
            method: 'GET',
            data: {
                getCountries: 1
            },
            success: function (response) {
                response = JSON.parse(response);
                resolve(Object.entries(response[1]["countries"]));
            },
            dataType: 'text'
        })
    })
}

export default function ShopCart() {
    const { isLoading: plansLoading, data: plans = [] } = useQuery(["plans"], getPlans);
    const { isLoading: countriesLoading, data: countries = [] } = useQuery(["countries"], getCountries);
    const { cartArray } = useContext(CartStorageContext);
    const [planPrice, setPlanPrice] = useState(0);
    const [selectedPlan, setselectedPlan] = useState(false);
    const [renewTable, setRenewTable] = useState(false);
    const [active, setActive] = useState(false);
    const navigate = useNavigate();
    let totalSum = 0;

    function deleteDomain(domain) {
        cartArray.splice(cartArray.indexOf(domain), 1)
        localStorage.setItem("domains", JSON.stringify(cartArray));
        setRenewTable(!renewTable);
    }
    function setPeriodOfDomain(period, domain) {
        cartArray[cartArray.indexOf(domain)][4] = Number(period);
        localStorage.setItem("domains", JSON.stringify(cartArray));
    }

    if (plansLoading || countriesLoading) {
        return (<Loading done={true}></Loading>)
    }

    active ? document.body.style.overflow = "hidden" : document.body.style.overflow = "auto";


    function handleSubmit(ev) {
        ev.preventDefault();
        localStorage.setItem("domains", JSON.stringify(cartArray));
    }
    return (
        <div>
            <div className="bg-[#313131] flex flex-col justify-center items-center">
                <button className="bg-orange-400 p-2 rounded-lg  mt-3" onClick={() => navigate("/search")}>Back to shop</button>
                <div className="max-w-7xl ">
                    <span className="flex justify-center text-3xl text-white py-4 text-center">SHOPPING CART</span>
                </div>
            </div>
            <div className="flex flex-col justify-center mt-10 text-center">
                <div className="h-auto">
                    <span className="text-2xl font-bold ">Choose Plan</span>
                    <div className="flex mobileDevices:grid justify-center">
                        {plans?.map((plan) => {
                            return (
                                <div key={plan[1]["full_name"]} className="text-center w-56 mx-2">
                                    <input type="radio" name="plan" id={plan[1]["full_name"]} value={plan[1]["prices"]["period_12"]["USD"]["price"]} className="hidden peer" onChange={ev => { setPlanPrice(ev.target.value); setselectedPlan(true) }}></input>
                                    <label htmlFor={`${plan[1]["full_name"]}`} className="bg-gray-300 peer-checked:bg-[#7cffa4] cursor-pointer desktop:text-2xl text-xl mobileDevices:my-2 p-2 rounded-xl flex flex-col">
                                        <span className="border-b-2 border-black">
                                            {plan[1]["full_name"]}
                                        </span>
                                        <span>
                                            ${plan[1]["prices"]["period_12"]["USD"]["price"].toFixed(2)}/yr
                                        </span>
                                    </label>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="grid justify-center">
                    <span className="text-2xl font-bold mt-6">Orders</span>
                    {cartArray.length === 0 ? <span className="text-4xl my-6">Cart is empty</span> : ""}
                    <table>
                        <tbody>
                            {cartArray?.map(domain => {
                                totalSum += +domain[1] * domain[4];
                                return (
                                    <tr key={domain[0]} className="border-b-2 border-black flex flex-row mobileDevices:flex-col items-center">
                                        <td className="py-3 break-all w-72 text-left mobileDevices:text-center flex flex-col">
                                            <span>{domain[2]} <span className="font-bold">{domain[0]}</span></span>
                                            {
                                                domain[2] === "Transfer" ?
                                                    <span className="pt-2">EPP Code:
                                                        <form onSubmit={handleSubmit}>
                                                            <input className="w-36 ml-2 border border-gray-400 rounded-sm" onChange={val => domain[5] = val.target.value}></input>
                                                        </form>
                                                    </span> : ""
                                            }
                                        </td>
                                        <td className="flex justify-end mobileDevices:w-full">
                                            <select onChange={e => { domain[4] = e.target.value; setPeriodOfDomain(e.target.value, domain); setRenewTable(!renewTable) }} defaultValue={'req'} className="w-44 m-2 ">
                                                <option hidden>{domain[4]} {domain[4] === 1 ? "year" : "years"}</option>
                                                {domain[3].map(period => {
                                                    return (
                                                        <option key={period} value={period} >{period} {period === 1 ? "year" : "years"}</option>
                                                    )
                                                })}
                                            </select>
                                        </td>
                                        <td className="flex justify-end items-end p-2 mobileDevices:w-full">
                                            <span className="w-20 ">${Number(domain[1] * domain[4]).toFixed(2)}</span>
                                            <button onClick={() => deleteDomain(domain)} aria-label="del" className="text-lg ml-3">
                                                <span> <FontAwesomeIcon icon="fa-solid fa-trash-can" /></span>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <span className="text-xl mt-4">Total price:
                        <span> ${(+totalSum + +planPrice).toFixed(2)}</span>
                        <span>
                            <button disabled={selectedPlan ? false : true} className="bg-orange-400 px-3 py-2 rounded-lg m-2 disabled:opacity-50" onClick={() => setActive(true)}>
                                Proceed
                            </button>
                        </span>
                    </span>
                </div>
            </div>
            <Active active={active}>
                <div className="fixed inset-0 flex items-center justify-center bg-slate-500 bg-opacity-50">
                    <OrderDetails
                        closeButton={
                            <button
                                type="button"
                                onClick={() => setActive(false)}>
                                <FontAwesomeIcon
                                    icon="fa-solid fa-xmark"
                                    className="text-3xl ml-2 text-black"
                                />
                            </button>
                        }
                        countries={countries}
                        planID={plans.find(plan => plan[1]["prices"]["period_12"]["USD"]["price"] === Number(planPrice))[1]["rp_product_id"]}
                        cartArray={cartArray}
                    />
                </div>
            </Active>
        </div>
    );
}