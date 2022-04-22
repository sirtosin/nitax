import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";

const Table = () => {
  const Api_Url = "https://swapi.dev/api/planets/?page=";
  const [info, setInfo] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const handlePageClick = async (data) => {
    // console.log(data.selected);
    let currentPage = data.selected + 1;
    setPage(currentPage);
    console.log("page", currentPage);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(async () => {
      const resp = await axios.get(Api_Url + page).then(
        (response) => {
          if (response.status === 200) {
            console.log("response", response);
            setInfo(response.data.results);
            setLoading(false);
          }
          else {
            setLoading(true);
          }
        }
      ).catch(err => console.log(err));
    }, 1000);
  }, [page]);

  return (
    <main className="flex items-start">
      {!loading ? (
        <>
          <section className="hidden md:inline-block h-screen w-[200px] bg-slate-500 shadow-md ">
            <h3 className="text-white  font-bold text-2xl text-center p-5 capitalize">
              side bar
            </h3>
          </section>
          <section>
            <h3 className="text-xl font-semibold m-3 capitalize">
              current page {page}
            </h3>
            <table className="bg-white w-max m-4 shadow-xl rounded-md min-w-full overflow-auto scrollbar-hide">
              <thead className="border-b bg-zinc-200">
                <tr className="capitalize text-xl font-bold text-gray-900 px-4 py-3 text-left ">
                  <th className=" px-4 py-3 ">s/n</th>
                  <th className=" px-4 py-3 ">name</th>
                  <th className=" px-4 py-3 ">climate</th>
                  <th className=" px-4 py-3 ">terrain</th>
                  <th className=" px-4 py-3 ">gravity</th>
                  <th className=" px-4 py-3 ">population</th>
                  <th className=" px-4 py-3 ">diameter</th>
                </tr>
              </thead>

              {info?.map((item, index) => (
                <tbody key={index + 1}>
                  <tr className="border-b p-4">
                    <td className=" text-gray-900 font-light px-4 py-3 ">
                      {index + 1}
                    </td>
                    <td className=" text-gray-900 font-light px-4 py-3 ">
                      {item.name}
                    </td>
                    <td className=" text-gray-900 font-light px-4 py-3 ">
                      {item.climate}
                    </td>
                    <td className=" text-gray-900 font-light px-4 py-3 ">
                      {item.terrain}
                    </td>
                    <td className=" text-gray-900 font-light px-4 py-3 ">
                      {item.gravity}
                    </td>
                    <td className=" text-gray-900 font-light px-4 py-3 ">
                      {item.population}
                    </td>
                    <td className=" text-gray-900  font-light px-4 py-3">
                      {item.diameter}
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
            <ReactPaginate
              previousLabel={"previous"}
              nextLabel={page >= 6 ? "last" : "next"}
              pageCount={6}
              breakLabel={"..."}
              marginPagesDisplayed={2}
              pageRangeDisplayed={2}
              onPageChange={handlePageClick}
              containerClassName={"flex items-center justify-center"}
              pageClassName={
                "border p-3 m-2 rounded-md cursor-pointer hover:bg-gray-200"
              }
              pageLinkClassName={"font-bold "}
              previousClassName={
                "bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded border-none outline-none "
              }
              previousLinkClassName={
                "bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded border-none outline-none"
              }
              nextClassName={
                "bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded border-none outline-none"
              }
              nextLinkClassName={
                "bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded border-none outline-none"
              }
              breakClassName={""}
              breakLinkClassName={""}
              // activeLinkClassName={"bg-gray-200"}
              activeClassName={"bg-gray-200"}
              forcePage={page - 1}
            />
          </section>
        </>
      ) : (
        <h3 className="text-5xl font-bold mx-auto flex items-center justify-center h-screen capitalize ">
          loading..
        </h3>
      )}
    </main>
  );
};

export default Table;
