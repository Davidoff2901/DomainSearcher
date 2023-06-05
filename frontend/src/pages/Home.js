import React, { useContext, useEffect, useState } from "react";
import online from "../media/online.png";
import site from "../media/site.png";
import website from "../media/website.png";
import space from "../media/space.png";
import tech from "../media/tech.png";
import pdf from "../media/sample.pdf";
import Video from "../components/Video";
import Domains from "../components/Domains";
import Information from "../components/Information.js";
import Error from "../components/Error";
import Active from "../components/Active";
import { SearchContext, ApiContext } from "../helpers/Contexts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { v4 } from 'uuid'

export default function Home() {
  const navigate = useNavigate();
  const { domainSearch, setDomainSearch } = useContext(SearchContext);
  const { apiData } = useContext(ApiContext);
  const [active, setActive] = useState(false);
  const [domains, setDomains] = useState([]);
  const [error, setError] = useState("");
  const allowedChars = /^[a-zA-Z0-9-.]+$/;

  function handleSearch(e) {
    e.preventDefault()

    if (!domainSearch) {
      setError("Input is empty");
    }
    else if (domainSearch.length < 3 || domainSearch.length > 63) {
      setError("Input is too short or too long");
    }
    else if (!allowedChars.test(domainSearch)) {
      setError("Input takes only letters, numbers and dash");
    }
    else if (domainSearch.charAt(0) === '.') {
      setError("Input cannot start with '.'");
    }
    else {
      navigate("/search");
    }
  }
  function chooseImage(picNumber) {
    switch (picNumber) {
      case 0: return online
      case 1: return site
      case 2: return tech
      case 3: return website
      case 4: return space
      default: return
    }
  }
  function selectDomains() {
    setDomains("")
    for (let i = 0; i < 5; i++) {
      const random = Math.floor(Math.random() * apiData.length),
        initialPrice = (apiData[random][1]['prices'] / 2).toFixed(2),
        standardPrice = apiData[random][1]['prices'].toFixed(2);

      let domain = <Domains key={v4()} img={chooseImage(Math.floor(Math.random() * 5))} price={standardPrice} discount={initialPrice} text={<p>great for all site types</p>} ></Domains>
      setDomains(domains => [...domains, domain])
    }
  }
  useEffect(() => {
    selectDomains();
  }, [])

  return (
    <div>
      <Active active={active}><Video setActive={setActive} ></Video> </Active>
      <div className="bg-[#276f86] flex items-center justify-center">
        <div className="h-auto pb-2 desktop:max-w-7xl ">
          <span className="text-5xl phone:text-[28px] phoneS:text-[20px] text-white text-center flex justify-center items-center py-4 px-2 font-bold"> Find your perfect site name</span>
          <div className="text-center">
            <span className="text-[18px] text-white"> Register your domain as low as
              <span className="text-xl"> $</span>
              <span className="text-2xl">15.00</span>/per year
            </span>
          </div>

          <div className="flex justify-center mt-4">
            <div className="m-3">
              <FontAwesomeIcon icon="fa-solid fa-file-pdf" className="text-2xl mr-2 text-white" />
              <a href={pdf} target="_blank" rel="noreferrer" className="text-white desktop:text-2xl phone:text-sm">DOMAINS BROCHURE (PDF)</a>
            </div>

            <div className="m-3 flex flex-row ">
              <FontAwesomeIcon icon="fa-solid fa-circle-play" className="text-2xl text-white" />
              <button className="text-white desktop:text-2xl phone:text-sm pl-2" onClick={() => setActive(true)}>WATCH VIDEO</button>
            </div>
          </div>

          <div className="flex justify-center items-center flex-col">
            <div className="flex justify-center phoneS:flex-col items-center pt-6 ">
              <div className="relative text-gray-600 focus-within:text-gray-400 ">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2 ">
                  <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
                </span>
                <form onSubmit={handleSearch}>
                  <input className="py-2 pl-10 text-sm text-black bg-white rounded-md desktop:w-96 phoneS:w-48 phoneS:mb-2" placeholder="Search..." onChange={ev => setDomainSearch(ev.target.value.toLowerCase())} />
                </form>
              </div>
              <button className="bg-orange-500 p-2 rounded-sm ml-3 text-white" onClick={handleSearch}>
                Search
              </button>
            </div>
            <Error error={error}></Error>
          </div>

          <div className="flex mobileDevices:flex-col justify-evenly items-center my-7">
            <div className="bg-[#5099B0] w-64 h-32 phoneS:w-48 flex flex-col justify-center items-center border my-3 border-black ">
              <span className="text-yellow-300 text-sm p-2 text-center">Have an international site?</span>
              <span className="text-white text-sm p-2 text-center"> Go with a global extension like .COM, .NET, .INFO, .ORG or .CO etc.</span>
            </div>

            <div className="bg-[#5099B0] w-64 h-32 phoneS:w-48 flex flex-col justify-center items-center border border-black">
              <span className="text-yellow-300 text-sm p-2 text-center" >Run a locally-targeted site?</span>
              <span className="text-white text-sm p-2 text-center">Choose a country-code TLD like .UK, .US, .RU, .SE or .EU etc.</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#F5F5F5] border border-gray-400 flex justify-evenly">
        <div className="h-auto desktop:max-w-7xl ">
          <div className="flex flex-col desktop:flex-row">
            {domains}
          </div>
          <div className="flex justify-center">
            <FontAwesomeIcon icon="fa-solid fa-circle-play" className="text-2xl text-gray-500 mt-6" />
            <button className="text-gray-500 desktop:text-2xl mobileDevices:text-lg pl-4 my-5" onClick={() => setActive(true)}>WATCH VIDEO</button>
          </div>
        </div>
      </div>

      <div className="bg-white flex items-center justify-center">
        <div className="h-auto desktop:max-w-7xl">
          <span className="desktop:text-5xl text-xl text-black flex justify-center items-center font-bold my-6 text-center"> Why get online with us?</span>

          <div className="flex desktop:flex-row flex-col justify-center items-baseline">
            <Information icon="fa-solid fa-handshake" title={<span>Trusted Domain Registrar</span>} text={<span>As the partner  of multiple ICANN-accredited registrars, we can offer you great domain name prices and guarantee for offering excellent domain registration and managment services.</span>} />
            <Information icon="fa-solid fa-globe" title={<span>60+ TLDs to Choose From</span>} text={<span> With us, you can choose from more than 60 generic, country-code and new domain extensions for your personal or business websites</span>} />
            <Information icon="fa-solid fa-gamepad" title={<span>Advanced Domain manager</span>} text={<span>Our all-in-one Domain Manager will help you register, transfer and manage domains with a click. You can lock your domains, edit Whois data and name servers, request and EPP, etc.</span>} />
          </div>
        </div>
      </div>

      <div className="bg-[#F5F5F5] border border-gray-400 flex items-center justify-center">
        <div className="h-auto desktop:max-w-7xl ">
          <span className="desktop:text-5xl text-xl text-black flex justify-center items-center font-bold my-6 text-center"> What comes with domain registration</span>
          <div className="flex desktop:flex-row flex-col justify-between items-baseline">
            <Information icon="fa-solid fa-network-wired" title={<span>Edit Name Servers</span>} text={<span>If you need to change the name servers of your domain name, you can do so anytime from your Domain Manager. This will keep you in full control of your domains.</span>} />
            <Information icon="fa-solid fa-id-card" title={<span>Edit Whois</span>} text={<span>From your Domain Manager, you can change the information in your domain's Whois with a click of the mouse and have it updated online within minutes.</span>} />
            <Information icon="fa-solid fa-shield" title={<span>Whois Privacy Protection</span>} text={<span>To keep your personal data hidden from the Whois of your domain and from the public eye, you can take advantage of our Whois Privacy Protection service at a great price.</span>} />
            <Information icon="fa-solid fa-phone-volume" title={<span>24/7 Support</span>} text={<span>We are online 24/7 for you to respond to any inquiries that you may have about your sites. Our team comprises of experienced technicians who will be glad to help anytime.</span>} />
          </div>
        </div>
      </div>
    </div>
  );
}