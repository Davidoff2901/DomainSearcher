import React, { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Error from "../components/Error";
import { SearchContext, ApiContext, CartStorageContext } from "../helpers/Contexts";
import DomainRow from "../components/DomainRow";
import { useNavigate } from "react-router-dom";
import Active from "../components/Active";
import Loading from "../components/Loading";
import { useQuery } from "@tanstack/react-query";
import { v4 } from 'uuid';
import $ from "jquery";

export function getPeriods() {
  return new Promise((resolve) => {
    $.ajax({
      url: 'https://api.tovanqmadaezaeto.com/server.php',
      method: 'GET',
      data: {
        getPeriods: 1
      },
      success: function (response) {
        response = JSON.parse(response);
        resolve(Object.entries(response[1]));
      },
      dataType: 'text'
    });
  })
}

export default function Search() {
  const navigate = useNavigate();
  const { cartArray } = useContext(CartStorageContext);
  const { domainSearch, setDomainSearch } = useContext(SearchContext);
  const { apiData } = useContext(ApiContext);
  const { isLoading, data: periods = [] } = useQuery(
    ["periods"],
    getPeriods,
  );
  const [error, setError] = useState("");
  const [domains, setDomains] = useState([]);
  const [active, setActive] = useState(false);
  const allowedChars = /^[a-zA-Z0-9-.]+$/;
  let displayedDomains = [];

  useEffect(() => {
    if (periods.length > 0) {
      selectDomains()
    }
  }, [periods])

  if (isLoading) {
    return <Loading done={true}></Loading>
  }

  function handleSearch(e) {
    e.preventDefault();

    if (!domainSearch) {
      setError("Input is empty");
    }
    else if (domainSearch.length < 3 || domainSearch.length > 63) {
      setError("Input is too short or too long");
    }
    else if (!allowedChars.test(domainSearch)) {
      setError("Input takes only letters, numbers and dash");
    }
    else {
      setError("");
      selectDomains();
    }
  }

  function selectDomains() {
    setDomains("");
    if (domainSearch) { setActive(true) }

    let tldOfDomain = apiData.find(dom => dom[1]["full_name"] === domainSearch.substring(domainSearch.indexOf(".") + 1));
    let splitDomain = domainSearch.split(".")


    if (tldOfDomain) {
      let status = Math.floor(Math.random() * 2) === 1 ? "Transfer" : "Register",
        price = tldOfDomain[1]["prices"].toFixed(2),
        allPeriods = periods[2][1][tldOfDomain[0]]["years"],
        indexOfTld = apiData.indexOf(tldOfDomain);

      displayedDomains.push(indexOfTld)

      let domain = <DomainRow key={v4()} domainSearch={domainSearch.toLowerCase().replace(`.${tldOfDomain[0]}`, "")} tld={tldOfDomain[1]["full_name"]} price={price} status={status} periods={allPeriods}></DomainRow>;
      setDomains(domains => [...domains, domain]);
    }

    for (let i = 0; i < 5; i++) {
      let random = Math.floor(Math.random() * apiData.length);
      if (displayedDomains.includes(random)) {
        random = Math.floor(Math.random() * apiData.length)
        displayedDomains.push(random);
      }

      let tld = apiData[random][1]["full_name"];
      if (periods[2][1][tld] === undefined) {
        i--;
      }
      else {
        let status = Math.floor(Math.random() * 2) === 1 ? "Transfer" : "Register",
          price = Number(apiData[random][1]['prices']).toFixed(2),
          allPeriods = periods[2][1][tld]["years"];

        let domain = <DomainRow key={v4()} domainSearch={splitDomain[0]} tld={tld} price={price} status={status} periods={allPeriods}></DomainRow>
        setDomains(domains => [...domains, domain])
      }
    }
  }

  function TLDButton({ text }) {
    return (
      <button className="font-bold p-2 desktop:text-[20px] phoneS:text-[16px] phoneS:w-30 desktop:border-l-2 tablet:border-l-2 border-black focus:text-orange-500 ">
        {text}
      </button>
    );
  }

  return (
    <div>
      <div className="bg-[#313131] flex justify-center items-center">
        <div className="max-w-7xl mb-6">
          <div className="flex justify-center text-3xl text-white py-6 text-center">FIND A DOMAIN FOR YOUR SITE:</div>
          <div className="flex justify-center items-center flex-col">
            <div className="flex phoneS:flex-col justify-center items-center mt-6 ">
              <div className="relative text-gray-600 focus-within:text-gray-400 ">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2 ">
                  <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
                </span>
                <form onSubmit={handleSearch}>
                  <input className="py-2 pl-10 text-sm text-black bg-white rounded-md w-96 phoneS:w-44 phone:w-48 block" value={domainSearch} placeholder="Search..." onChange={ev => setDomainSearch(ev.target.value.toLowerCase())} />
                </form>
              </div>
              <button className="bg-orange-500 p-2 rounded-sm m-3 text-white " onClick={handleSearch}>
                Search
              </button>
            </div>
            <Error error={error}></Error>
          </div>
        </div>
      </div>

      <div className="flex justify-center text-3xl text-black pt-6 text-center">DOMAIN SEARCH RESULTS</div>

      <Active active={active}>
        <div className="flex justify-center my-4">
          <div className="flex phone:flex-col phoneS:flex-col">
            <button className="px-2 font-bold desktop:text-[20px] phoneS:text-[16px] focus:text-orange-500"><span>FREE TLDS <span className="desktop:text-[10px] phoneS:text-[8px] phone:text-[10px] block">(WITH HOSTING PLAN)</span></span></button>
            <TLDButton text={"NEW TLDS"}></TLDButton>
            <TLDButton text={"TLDS"}></TLDButton>
            <TLDButton text={"CCTLDS"}></TLDButton>
            <TLDButton text={"SUGGESTIONS"}></TLDButton>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center">
          <table className="table justify-center items-center">
            <thead>
              <tr>
                <th className="py-2 border-2 border-b-gray-500 border-t-black border-t-4 border-white w-96" >domain</th>
                <th className="border-2 border-b-gray-500 border-t-black border-t-4 border-white w-96" >status</th>
                <th className=" border-2 border-b-gray-500 border-t-black border-t-4 border-white w-96" >price</th>
              </tr>
            </thead>
            <tbody>
              {domains}
            </tbody>
          </table>
          <div>
            <button onClick={() => navigate("/shopcart")} className="desktop:text-3xl phoneS:text-xl bg-orange-400 p-2 mt-2 rounded-lg ">
              Checkout: {cartArray.length}
              <FontAwesomeIcon icon={"fa-solid fa-shopping-cart"} />
            </button>
          </div>
          <div className="text-center mt-3">
            *Domain promo prices are valid for the first year of registration only. The regular fee will be charged upon renewal.
          </div>
        </div>
      </Active>
      <div>
      </div>
    </div>
  );
}