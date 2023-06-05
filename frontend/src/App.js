import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import Search from "./pages/Search";
import ShopCart from "./pages/ShopCart";
import NotFound from "./pages/NotFound";
import { Route, Routes } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { SearchContext, ApiContext, CartStorageContext } from "../src/helpers/Contexts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import $ from "jquery";

library.add(fas);

function App() {
  const [domainSearch, setDomainSearch] = useState("");
  const [apiData, setApiData] = useState([]);
  const [cartArray, setCartArray] = useState(JSON.parse(localStorage.getItem("domains")) || []);

  const client = new QueryClient()

  function getData() {
    $.ajax({
      url: 'https://api.tovanqmadaezaeto.com/server.php',
      method: 'GET',
      data: {
        getData: 1
      },
      success: function (response) {
        response = JSON.parse(response);
        setApiData(Object.entries(response[1]["registerdomains"]));
      },
      error: function (error) {
        return error;
      },
      dataType: 'text'
    })
  }
  useEffect(() => {
    getData();
  }, [])

  if (apiData.length === 0) { return; }
  return (
    <div>
      <link rel="preconnect" href="https://api.tovanqmadaezaeto.com/server.php" />
      <QueryClientProvider client={client}>
        <ApiContext.Provider value={{ apiData, setApiData }}>
          <SearchContext.Provider value={{ domainSearch, setDomainSearch }}>
            <CartStorageContext.Provider value={{ cartArray, setCartArray }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/shopcart" element={<ShopCart />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </CartStorageContext.Provider>
          </SearchContext.Provider>
        </ApiContext.Provider>
      </QueryClientProvider>
    </div>
  );
}
export default App;