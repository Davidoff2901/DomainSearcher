import { useState } from "react"
import Error from "./Error";
import $ from "jquery"

const formFields = ['Firstname', 'Lastname', 'Address', 'ZIP', 'City', 'Province', 'Email', 'Phone', 'Username', 'Company',]

export default function OrderDetails({ closeButton, countries, planID, cartArray }) {
    const [error, setError] = useState("");
    let domains = [];
    const [details, setDetails] = useState({
        firstname: "",
        lastname: "",
        address: "",
        zip: "",
        city: "",
        province: "",
        country: "",
        email: "",
        phone: "",
        username: "",
        company: "",
    })
    let contacts = {
        registrantfirstname: details.firstname,
        registrantlastname: details.lastname,
        registrantaddress1: details.address,
        registrantpostalcode: details.zip,
        registrantcity: details.city,
        registrantstateprovince: details.province,
        registrantcountry: details.country,
        registrantemailaddress: details.email,
        registrantphone: details.phone,
    }

    for (let i = 0; i < cartArray.length; i++) {
        domains.push({
            type: cartArray[i][2].toLowerCase(),
            sld: cartArray[i][0].substring(0, cartArray[i][0].indexOf(".")),
            tld: cartArray[i][0].substring(cartArray[i][0].indexOf(".") + 1),
            period: cartArray[i][4],
            epp: 1234123,
            contacts: contacts
        })
    }

    function handleChange(value, name) {
        setDetails({
            ...details, [name]: value,
        });
    };

    function handleSubmit(ev) {
        ev.preventDefault();
        if (Object.values(details).some(value => value === "") === true) {
            setError(`${Object.keys(details)[Object.values(details).indexOf("")]} is not filled!`)
        }
        else {
            setError("")
            sendFormData();
        }
    };

    function sendFormData() {
        $.ajax({
            url: 'https://api.tovanqmadaezaeto.com/server.php',
            method: 'POST',
            data: {
                sendData: 1,
                username: details.username,
                company: details.company,
                firstname: details.firstname,
                lastname: details.lastname,
                email: details.email,
                phone: details.phone,
                address1: details.address,
                city: details.city,
                province: details.province,
                zip: details.zip,
                country: details.country,
                currency: "USD",
                period: "12",
                plan: planID,
                domains: domains,
            },
            success: function (response) {
                response = JSON.parse(response);
                if (response[1]["error_code"] === 0) {
                    localStorage.removeItem("domains")
                    window.location.replace(response[1]['redirect_url'])
                }
                else setError(response[1]["error_msg"])
            },
            error: function (error) {
                return error;
            },
            dataType: 'text'
        })
    }

    return (
        <div>
            <form className="border-2 border-black p-4 bg-gray-300 rounded-lg flex flex-col mobileDevices:w-64 mobileDevices:h-[90vh] overflow-auto" onSubmit={handleSubmit}>
                <div className="flex justify-end">
                    {closeButton}
                </div>
                {formFields.map((inputName) => (
                    <div key={inputName} className="text-center ">
                        <div className="mobileDevices:grid flex items-end justify-end text-center m-2">
                            <span className="mr-2 text-2xl">{inputName}:</span>
                            <input
                                type="text"
                                value={details.inputName}
                                placeholder="required"
                                onChange={(e) => handleChange(e.target.value, inputName.toLowerCase())}
                                className="bg-[#E9E9E9] rounded-[4px] mobileDevices:w-[200px]"
                            />
                        </div>
                    </div>
                ))}
                <div className="text-center flex mobileDevices:grid justify-end items-end mt-2">
                    <span className="mr-2 text-2xl">Country:</span>
                    <select onChange={e => setDetails({ ...details, 'country': e.target.value })} defaultValue={'req'} className="bg-[#E9E9E9] rounded-md mobileDevices:w-[200px] desktop:w-[274px] mr-2 ">
                        <option key={'1'} disabled value={'req'} hidden>required</option>
                        {countries?.map(country => {
                            return (
                                <option key={country[1]["name"]} value={country[1]["iso2"]}>{country[1]["name"]}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="text-center">
                    <Error error={error}></Error>
                </div>
                <button className="bg-orange-400 p-2 rounded-lg mt-4" type="submit">Submit</button>
            </form>
        </div>
    )
}