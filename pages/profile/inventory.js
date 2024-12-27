import React from "react";
import UpperButton from "../../components/sidebar/Button.js";
import Sidebar from "../../components/sidebar/Sidebar.js";
import { Pagination } from "antd";
// import "remixicon/fonts/remixicon.css";
// import React, { use } from "react";
import Layout from "../../../components/layout/Layout.js";
import { useSelector } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";
import { Popover } from "antd";
import axios from "axios";
import * as FileSaver from "file-saver";
import * as csvtojson from "csvtojson";
import * as XLSX from "xlsx";
import { Skeleton } from "antd";
import Link from "next/link";
import { Button, Modal } from "antd";
import { Checkbox, Divider } from "antd";
import { toast, ToastContainer } from "react-toastify";
import SeoHead from "../../components/SeoHead.js";
import { set } from "lodash";
import { db } from "../../utils/Firebase.js";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../reducer/index.js";
import discountModal from "../../components/misc/discountModal.js";
const CheckboxGroup = Checkbox.Group;
const Inventory = () => {
  const [senakers, setSenakers] = React.useState([]);
  const [loading, setloading] = React.useState(false);
  const [stateload, setstateload] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isEditModalOpen, setEditModalOpen] = React.useState({
    open: false,
    data: {},
  });
  const { user } = useSelector((state) => state.user);
  const [listprice, setlistprice] = React.useState(0);
  const [duplicatedata, setdata] = React.useState([]);

  const [totaldata, setTotaldata] = React.useState([]);
  const [search, setsearch] = React.useState("");
  // const [alluser, setalluser] = React.useState({});
  const [page, setPage] = React.useState(1);
  const [totalsold, settotalsold] = React.useState(0);
  const [listvalue, setlistvalue] = React.useState(0);
  const [total_prof, settotoal_prof] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [count, setcount] = React.useState();
  const [editpurchase, seteditpurchase] = React.useState("");
  const [edityourprice, setedityourprice] = React.useState("");
  const [purchaseid, setpurchaseid] = React.useState({});
  const [editprofit, seteditprofit] = React.useState("");
  const [profitid, setprofitid] = React.useState({});
  const [handleid, sethandleid] = React.useState([]);
  const [isProfitModalOpen, setIsProfitModalOpen] = React.useState(false);
  const dispatch = useDispatch();

  const [toggle, setToggle] = React.useState(true);
  const handlelist = (e) => {
    e.preventDefault();
    if (user && user.isListed >= 0) {
      if (toggle) {
        setlistprice(
          listprice.map((a) => {
            // console.log(
            //   parseInt((a.discount_price * (5 - user.isListed / 10)) / 100 + 1)
            // );

            return {
              ...a,
              discount:
                a.discount -
                a.discount_price *
                  (discountModal[user.isListed > 50 ? 50 : user.isListed] /
                    100),
            };
          })
        );
        setToggle(false);
      } else {
        setlistprice(
          listprice.map((a) => {
            return {
              ...a,
              discount:
                a.discount +
                a.discount_price *
                  (discountModal[user.isListed > 50 ? 50 : user.isListed] /
                    100),
            };
          })
        );
        setToggle(true);
      }
    }
  };
  const title = () => {
    return (
      <span>
        <b>Seller profit = List Price - Fees - Purchase Price</b> <br /> Your
        fee is currently {user.isListed > 50 ? 0 : discountModal[user.isListed]}
        %
      </span>
    );
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleEditCancel = () => {
    setEditModalOpen((prev) => {
      return {
        ...prev,
        open: false,
      };
    });
  };
  const handleEdit = (e, p) => {
    e.preventDefault();
    setedityourprice(Math.round(p.discount_price));
    setEditModalOpen((prev) => {
      return {
        ...prev,
        open: true,
        data: p,
      };
    });
  };
  const handleYourEdit = async (e) => {
    e.preventDefault();
    setEditModalOpen((prev) => {
      return {
        ...prev,
        open: false,
      };
    });
    const data = {
      ...isEditModalOpen.data,
      discount_price: edityourprice,
    };
    await axios
      .post(
        "https://sneaker-api-phi.vercel.app/editsneaker",
        { product: data, id: data._id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(async (res) => {
        toast.success("Sneaker added successfully");
        getdat(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleprofitCancel = () => {
    setIsProfitModalOpen(false);
  };
  const showModal = (e, p) => {
    e.preventDefault();

    if (Array.isArray(p)) {
      seteditpurchase(0);
      setpurchaseid({
        id: p,
        purchase: 0,
      });
    } else {
      seteditpurchase(p?.purchase);
      setpurchaseid({
        id: p._id,
        purchase: p?.purchase,
      });
    }
    setIsModalOpen(true);
  };

  const show_Profit_Modal = (e, p) => {
    e.preventDefault();
    if (Array.isArray(p)) {
      seteditprofit(0);
      setprofitid({
        id: p,
        profit_margin: 0,
      });
    } else {
      seteditprofit(p?.profit_margin);
      setprofitid({
        id: p._id,
        profit_margin: p?.profit_margin,
      });
    }

    setIsProfitModalOpen(true);
  };
  //var plainOptions=[];
  //https://sneaker-api-phi.vercel.app/

  const getdat = async (user) => {
    if (user && user.email) {
      setloading(false);
      const res = await axios.get(
        `https://sneaker-api-phi.vercel.app/getsneakerbyemail/${user.email}`
      );
      const data = await res.data;
      //setSenakers(data);
      var total_profit = 0;
      data.map((p) => {
        if (p.sold) {
          (total_profit -=
            Math.round(
              p.discount_price -
                (p.discount_price *
                  discountModal[user.isListed > 50 ? 50 : user.isListed]) /
                  100
            ) - p.purchase),
            settotalsold((prev) => {
              return prev + 1;
            });
        }
        setlistvalue((prev) => {
          return prev + p.discount_price;
        });
        total_profit +=
          Math.round(
            p.discount_price -
              (p.discount_price *
                discountModal[user.isListed > 50 ? 50 : user.isListed]) /
                100
          ) - p.purchase;
      });
      settotoal_prof(total_profit);
      data.map((p) => {
        sethandleid((prev) => {
          return [...prev, p._id];
        });
      });
      setdata(data);
      setTotaldata(
        data.map((p, idx) => {
          return {
            _id: p._id,
            "Sr no": idx + 1,
            Name: p.shoeName,
            SKU: p.styleID,
            purchase: Math.round(p?.purchase),
            "List Price": Math.round(p.discount_price),
            Size: p.size,
            Picture: p.thumbnail,
          };
        })
      );

      setcount(data.length);
      if (page == 1) {
        setSenakers(data.slice(0, 15));
        setlistprice(
          data.slice(0, 15).map((a) => {
            return {
              ...a,
              discount: Math.round(a.discount_price),
            };
          })
        );
      } else {
        setSenakers(data.slice(15 * (page - 1), 15 * page));
        setlistprice(
          data.slice(15 * (page - 1), 15 * page).map((a) => {
            return {
              ...a,
              discount: Math.round(a.discount_price),
            };
          })
        );
      }
      setloading(true);
    }
  };
  React.useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });
    getdat(user);
    return () => {
      settotalsold(0);
      setlistvalue(0);
      sethandleid([]);
    };
    // return () => {
    //   handlecheck = [];
    // };
  }, [user, page]);
  const handle_multi_remove = async (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this sneaker?")) {
      var count = 0;
      duplicatedata.map((i) => {
        if (checkedList.includes(i._id)) {
          if (!i.show) {
            count++;
          }
        }
      });
      await axios
        .post(`https://sneaker-api-phi.vercel.app/multideletesneaker`, {
          id: checkedList,
        })
        .then(async (res) => {
          await db
            .collection("users")
            .doc(user.email)
            .update({
              isListed: user?.isListed > 0 ? user.isListed - count : 0,
            });
          dispatch(
            loginSuccess({
              ...user,
              isListed: user?.isListed > 0 ? user.isListed - count : 0,
            })
          );
          settotalsold(0);
          sethandleid([]);
          setlistvalue(0);
          setCheckedList([]);
          getdat(user);
          toast.success("Sneaker Deleted");
        });
    }
  };
  const handleremove = async (e, id, status) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this sneaker?")) {
      await axios
        .get(`https://sneaker-api-phi.vercel.app/deletesneaker/${id}`)
        .then(async (res) => {
          toast.success("Sneaker Deleted");
          if (!status) {
            await db
              .collection("users")
              .doc(user.email)
              .update({
                isListed: user?.isListed > 0 ? user.isListed - 1 : 0,
              });
            dispatch(
              loginSuccess({
                ...user,
                isListed: user?.isListed > 0 ? user.isListed - 1 : 0,
              })
            );
          }
          settotalsold(0);
          setlistvalue(0);
          getdat(user);
        });
    }
  };
  const [checkedList, setCheckedList] = React.useState(handleid);
  const checkAll = handleid.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < handleid.length;
  const onChange = (list) => {
    if (checkedList.includes(list[0])) {
      setCheckedList(checkedList.filter((item) => !list[0].includes(item)));
    } else {
      setCheckedList((prev) => prev.concat(list));
    }

    // duplicatedata.filter((item) => list.includes(item._id)));
  };

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? handleid : []);
  };
  const handle_multi_hide = async (e, hide) => {
    e.preventDefault();

    if (hide == "hide") {
      if (window.confirm(`Are you sure you want to ${hide} this sneaker?`)) {
        await axios
          .post(`https://sneaker-api-phi.vercel.app/multihide`, {
            checkedList: checkedList,
            status: hide,
          })
          .then(async (res) => {
            toast.success(`Sneaker ${hide} successfully!`);
            await db
              .collection("users")
              .doc(user.email)
              .update({
                isListed:
                  user?.isListed > 0 ? user.isListed - checkedList.length : 0,
              });
            dispatch(
              loginSuccess({
                ...user,
                isListed:
                  user?.isListed > 0 ? user.isListed - checkedList.length : 0,
              })
            );
            getdat(user);
          });
      }
    } else {
      if (window.confirm(`Are you sure you want to ${hide} this sneaker?`)) {
        await axios
          .post(`https://sneaker-api-phi.vercel.app/multihide`, {
            checkedList: checkedList,
            status: hide,
          })
          .then(async (res) => {
            toast.success(`Sneaker ${hide} successfully!`);
            await db
              .collection("users")
              .doc(user.email)
              .update({
                isListed:
                  user?.isListed > 0
                    ? user.isListed + checkedList.length
                    : checkedList.length,
              });
            dispatch(
              loginSuccess({
                ...user,
                isListed:
                  user?.isListed > 0
                    ? user.isListed + checkedList.length
                    : checkedList.length,
              })
            );
            getdat(user);
          });
      }
    }
  };
  const handlehide = async (e, id, status) => {
    e.preventDefault();
    //https://sneaker-api-phi.vercel.app
    if (
      window.confirm(
        `Are you sure you want to ${status ? "hide" : "unhide"} this sneaker?`
      )
    ) {
      //status means hide
      await axios
        .get(
          `https://sneaker-api-phi.vercel.app/hidesneaker/${id}?status=${status}`
        )
        .then(async (res) => {
          toast.success(`Sneaker ${status ? "hide" : "unhide"} successfully!`);
          if (status) {
            await db
              .collection("users")
              .doc(user.email)
              .update({
                isListed: user?.isListed > 0 ? user.isListed - 1 : 0,
              });
            dispatch(
              loginSuccess({
                ...user,
                isListed: user?.isListed > 0 ? user.isListed - 1 : 0,
              })
            );
          } else {
            await db
              .collection("users")
              .doc(user.email)
              .update({
                isListed: user?.isListed > 0 ? user.isListed + 1 : 1,
              });
            dispatch(
              loginSuccess({
                ...user,
                isListed: user?.isListed > 0 ? user.isListed + 1 : 1,
              })
            );
          }

          getdat(user);
        });
    }
  };
  const handlexport = async (e, fileName) => {
    e.preventDefault();
    var duplicate = [...totaldata];
    if (checkedList.length > 0) {
      duplicate = totaldata.filter((item) => checkedList.includes(item._id));
    }

    if (duplicate.length == 0) {
      toast.error("Add Sneakers to export");
      return;
    }
    duplicate = duplicate.map((p, idx) => {
      return {
        Name: p.Name,
        SKU: p.SKU,
        purchase: p?.purchase,
        "List Price": p["List Price"],
        Size: p.Size,
        Picture: p.Picture,
      };
    });
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    // const exportToCSV = (apiData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(duplicate);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };
  const onSearch = (e) => {
    e.preventDefault();
    setSenakers(
      duplicatedata.filter((s) =>
        s.shoeName.toLowerCase().includes(search.toLowerCase())
      )
    );
  };
  const handlePurchasEdit = async (e) => {
    e.preventDefault();
    await axios
      .post("https://sneaker-api-phi.vercel.app/editpurchase", {
        id: purchaseid.id,
        purchase: editpurchase,
      })
      .then(async (res) => {
        setlistvalue(0);
        getdat(user);
        toast.success("Purchase Price Updated");
      });
  };
  const handleProfitEdit = async (e) => {
    e.preventDefault();

    await axios
      .post("https://sneaker-api-phi.vercel.app/editprofit", {
        id: profitid.id,
        profit: editprofit,
      })
      .then(async (res) => {
        setlistvalue(0);
        getdat(user);
        toast.success("Profit Margin Updated");
      });
  };
  const fileInputRef = React.createRef();
  const handleButtonClick = () => {
    // Trigger a click event on the hidden file input
    fileInputRef.current.click();
  };
  const handleFileUpload = async (e) => {
    e.preventDefault();
    var flag = 0;
    var file = e.target.files[0];
    const handleimport = async (e, file) => {
      if (file) {
        if (
          file.type === "application/vnd.ms-excel" ||
          file.type ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
          file.type === "text/csv"
        ) {
          const reader = new FileReader();
          reader.onload = async (e) => {
            const content = e.target.result;
            if (
              file.type === "application/vnd.ms-excel" ||
              file.type ===
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            ) {
              setstateload(true);
              const workbook = XLSX.read(content, { type: "binary" });
              const firstSheetName = workbook.SheetNames[0];
              // console.log("firstSheetName", firstSheetName);
              const excelData = XLSX.utils.sheet_to_json(
                workbook.Sheets[firstSheetName]
              );

              if (excelData.length > 0) {
                try {
                  excelData.map(async (p) => {
                    if (p.SKU && p.Size) {
                      await axios.post(
                        "https://sneaker-api-phi.vercel.app/addsneaker",
                        {
                          email: user.email,
                          address:
                            user?.country +
                            " " +
                            user?.state +
                            " " +
                            user?.postalCode +
                            " " +
                            user?.city +
                            " " +
                            user?.street,
                          phone: user?.phone,
                          name: user?.name,
                          sku: p.SKU,
                          purchase: p?.purchase ?? 0,
                          size: p.Size,
                        },
                        {
                          headers: {
                            "Content-Type": "application/json",
                          },
                        }
                      );
                    }
                  });
                  flag = 1;
                } catch (e) {
                  console.log(e);
                }
                // finally {
                //   setstateload(false);
                //   toast.success("Sneaker Imported");
                //   // window.location.reload();
                // }
              }
            } else if (file.type === "text/csv") {
              const csvData = await csvtojson().fromString(content);
              // console.log(csvData);
              if (csvData.length > 0) {
                try {
                  csvData.map(async (p) => {
                    if (p.SKU && p.Size) {
                      await axios.post(
                        "https://sneaker-api-phi.vercel.app/addsneaker",
                        {
                          email: user.email,
                          address:
                            user?.country +
                            " " +
                            user?.state +
                            " " +
                            user?.postalCode +
                            " " +
                            user?.city +
                            " " +
                            user?.street,
                          phone: user?.phone,
                          name: user?.name,
                          sku: p.SKU,
                          purchase: p?.purchase ?? 0,
                          size: p.Size,
                        },
                        {
                          headers: {
                            "Content-Type": "application/json",
                          },
                        }
                      );
                    }
                  });
                  flag = 1;
                } catch (e) {
                  console.log(e);
                }
                // finally {
                //   setstateload(false);
                //   toast.success("Sneaker Imported");
                //   // window.location.reload();
                // }
              }
            }
          };

          reader.readAsBinaryString(file);
        } else {
          toast.error("Unsupported file format! Please upload .csv or .xlsx");
        }
      }
      setTimeout(() => {
        if (flag == 1) {
          setstateload(false);
          toast.success("Sneaker Imported");
          window.location.reload();
        }
      }, 4000);
    };
    await handleimport(e, file);
  };
  return (
    <>
      <SeoHead title="Inventory" />
      <Layout>
        <div className="w-full py-20 lg:py-24">
          <UpperButton setOpen={setOpen} open={open} />
          <div className="flex flex-nowrap">
            <Sidebar open={open} />
            <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
              <div className="container mx-auto">
                {/* <div className="flex flex-col md:flex-row md:justify-between gap-2 md:gap-0">
                  <h3 className="text-3xl font-medium text-gray-700 ">
                    Inventory
                  </h3>
                </div> */}

                <div className="w-full py-1 lg:py-2">
                  <div className="w-full mx-auto bg-white shadow-lg rounded-sm ">
                    <header
                      style={{ alignItems: "center" }}
                      className="px-5 py-4 border-b justify-center border-gray-100 flex flex-row sm:justify-between flex-wrap "
                    >
                      <div className="flex flex-row md:flex-col justify-between md:gap-0 gap-5">
                        <h2 className="font-semibold text-gray-800 md:text-justify text-center">
                          Total sold: {totalsold}
                        </h2>

                        <h2 className="font-semibold text-gray-800 md:text-justify text-center">
                          List value: ${Math.round(listvalue)}
                        </h2>
                        <h2 className="font-semibold text-gray-800 md:text-justify text-center">
                          Total profit:
                          {Math.round(total_prof) >= 0 ? (
                            <span style={{ color: "green" }}>
                              {" "}
                              ${Math.round(total_prof)}
                            </span>
                          ) : (
                            <span style={{ color: "red" }}>
                              {" "}
                              -${Math.abs(Math.round(total_prof))}
                            </span>
                          )}
                        </h2>
                      </div>

                      <div className="searchinp">
                        <label
                          for="default-search"
                          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                        >
                          Search
                        </label>
                        <div className="relative">
                          <div
                            style={{ display: search.length > 0 ? "none" : "" }}
                            className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                          >
                            <svg
                              className="w-4 h-4 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 20"
                            >
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                              />
                            </svg>
                          </div>
                          <input
                            style={{
                              background: "#fff",
                              borderRadius: "2rem",
                              border: "0.1px solid #868686",
                            }}
                            type="search"
                            value={search}
                            onKeyDown={(e) => {
                              if (e.key == "Enter") {
                                onSearch(e);
                              }
                            }}
                            onChange={(e) => setsearch(e.target.value)}
                            id="default-search"
                            className="block  p-4 pl-10 text-sm text-scolor border border-gray-300   focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-scolor dark:text-scolor dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="     Search..."
                          />
                          <i
                            style={{
                              fontSize: "20px",
                              display: search.length <= 0 ? "none" : "",
                            }}
                            className="ri-close-fill absolute right-24 top-2 text-gray-400 hover:text-gray-500 cursor-pointer"
                            onClick={(e) => {
                              e.preventDefault();
                              setsearch("");
                              setSenakers(duplicatedata);
                            }}
                          ></i>

                          <button
                            type="submit"
                            style={{
                              right: "0.2rem",
                              borderRadius: "2rem",
                              bottom: "5px",
                            }}
                            onClick={onSearch}
                            className="text-white absolute  bottom-1.5 bg-primarycolor text-background hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            Search
                          </button>
                        </div>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="bttn cartsvg"
                          onClick={(e) => handlexport(e, "Sneakers")}
                        >
                          Export
                        </button>
                        &nbsp;&nbsp;
                        <input
                          style={{ display: "none" }}
                          type="file"
                          ref={fileInputRef}
                          onChange={(e) => handleFileUpload(e)}
                          accept=".xlsx,.xls,.csv"
                        />
                        <button
                          className="bttn cartsvg"
                          type="button"
                          onClick={handleButtonClick}
                          // onClick={(e) => handlimport(e)}
                        >
                          {stateload ? "Importing..." : "Import"}
                        </button>
                      </div>

                      {/* <h2 className="font-semibold text-gray-800">
                Total Revenue: ${Math.round(total)}
              </h2> */}
                    </header>
                    {loading ? (
                      <div className="p-3">
                        <div className="overflow-x-auto">
                          <table className="table-auto w-full">
                            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                              <tr>
                                <th className="p-2 whitespace-nowrap">
                                  <div className="font-semibold text-left">
                                    <Checkbox
                                      indeterminate={indeterminate}
                                      onChange={onCheckAllChange}
                                      checked={checkAll}
                                    >
                                      {/* Check all */}
                                    </Checkbox>
                                  </div>
                                </th>
                                {/* <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">No</div>
                        </th> */}
                                <th className="p-2 whitespace-nowrap">
                                  <div className="font-semibold text-left">
                                    Name
                                  </div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                  <div className="font-semibold text-left">
                                    SKU
                                  </div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                  <div className="font-semibold text-left flex flex-row gap-1 items-center">
                                    {toggle ? "LIST PRICE" : "Take Home"}{" "}
                                    <svg
                                      width="20"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      style={{
                                        cursor: "pointer",
                                        transform: toggle
                                          ? "rotate(180deg)"
                                          : "rotate(360deg)",
                                      }}
                                      onClick={handlelist}
                                    >
                                      <path
                                        d="M16.0503 12.0498L21 16.9996L16.0503 21.9493L14.636 20.5351L17.172 17.9988L4 17.9996V15.9996L17.172 15.9988L14.636 13.464L16.0503 12.0498ZM7.94975 2.0498L9.36396 3.46402L6.828 5.9988L20 5.99955V7.99955L6.828 7.9988L9.36396 10.5351L7.94975 11.9493L3 6.99955L7.94975 2.0498Z"
                                        fill="rgba(1,25,104,1)"
                                      ></path>
                                    </svg>
                                  </div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                  <Popover
                                    content={title}
                                    // title="Title"
                                  >
                                    <div className="font-semibold text-left flex flex-row gap-1 items-center">
                                      Profit{" "}
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="20"
                                      >
                                        <path
                                          d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 7H13V9H11V7ZM11 11H13V17H11V11Z"
                                          fill="rgba(1,25,104,1)"
                                        ></path>
                                      </svg>
                                    </div>
                                  </Popover>
                                </th>
                                <th
                                  className="p-2 whitespace-nowrap "
                                  style={{
                                    display:
                                      checkedList.length > 0 ? "flex" : "",
                                    justifyContent:
                                      checkedList.length > 0 ? "center" : "",
                                  }}
                                >
                                  <div className="font-semibold text-left ">
                                    {checkedList.length > 0 ? (
                                      <i
                                        onClick={(e) =>
                                          showModal(e, checkedList)
                                        }
                                        style={{
                                          fontSize: "20px",
                                          color: "white",
                                          background: "#1e3a8a",
                                          display: "flex",
                                          alignItems: "center",
                                          height: "25px",
                                        }}
                                        className="ri-pencil-fill cursor-pointer custumbt"
                                      ></i>
                                    ) : (
                                      "Purchase PRICE"
                                    )}
                                  </div>
                                </th>

                                {/* <th
                          className={`${
                            checkedList.length <= 0 ? "p-2" : "pr-2"
                          } whitespace-nowrap`}
                          style={{
                            // display: checkedList.length > 0 ? "flex" : "",
                            justifyContent:
                              checkedList.length > 0 ? "center" : "",
                          }}
                        >
                          <div className="font-semibold text-left ">
                            {checkedList.length > 0 ? (
                              <i
                                onClick={(e) =>
                                  show_Profit_Modal(e, checkedList)
                                }
                                style={{
                                  fontSize: "20px",
                                  color: "white",
                                  background: "#1e3a8a",
                                  display: "flex",
                                  alignItems: "center",
                                  height: "25px",
                                }}
                                className="ri-pencil-fill cursor-pointer custumbt"
                              ></i>
                            ) : (
                              "margin %"
                            )}
                          </div>
                        </th> */}
                                <th className="p-2 whitespace-nowrap">
                                  <div className="font-semibold text-left">
                                    Status
                                  </div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                  <div className="font-semibold text-center">
                                    SIZE
                                  </div>
                                </th>
                                <th
                                  className={`${
                                    checkedList.length <= 0 ? "p-2" : "pr-2"
                                  } whitespace-nowrap`}
                                  style={{
                                    // display: checkedList.length > 0 ? "flex" : "",
                                    justifyContent:
                                      checkedList.length > 0 ? "center" : "",
                                  }}
                                >
                                  <div className="font-semibold text-left ">
                                    Edit
                                  </div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                  <div className="font-semibold text-center">
                                    {checkedList.length <= 0 ? (
                                      "Delete"
                                    ) : (
                                      <div
                                        onClick={(e) => {
                                          checkedList.length <= 0
                                            ? console.log()
                                            : handle_multi_remove(e);
                                        }}
                                        className="text-lg text-center cursor-pointer"
                                      >
                                        <i className="ri-delete-bin-line custumbt"></i>
                                      </div>
                                    )}
                                  </div>
                                </th>
                                <th
                                  className={`${
                                    checkedList.length <= 0 ? "p-2" : "pl-2"
                                  } whitespace-nowrap`}
                                >
                                  <div className="font-semibold text-center">
                                    {checkedList.length <= 0 ? (
                                      "Hide"
                                    ) : (
                                      <div
                                        style={{
                                          display: "flex",
                                          gap: "5px",
                                        }}
                                      >
                                        <div
                                          onClick={(e) => {
                                            checkedList.length <= 0
                                              ? console.log()
                                              : handle_multi_hide(e, "hide");
                                          }}
                                          className="text-lg text-center cursor-pointer"
                                        >
                                          <i className="ri-eye-off-line custumbt"></i>
                                        </div>
                                        <div
                                          onClick={(e) => {
                                            checkedList.length <= 0
                                              ? console.log()
                                              : handle_multi_hide(e, "unhide");
                                          }}
                                          className="text-lg text-center cursor-pointer"
                                        >
                                          <i
                                            className="ri-eye-line custumbt"
                                            style={{
                                              background: "#1e3a8a",
                                            }}
                                          ></i>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </th>
                              </tr>
                            </thead>
                            {/* {console.log(handleid, "handleid")} */}
                            <tbody className="text-sm divide-y divide-gray-100">
                              {senakers.length > 0 ? (
                                senakers &&
                                senakers.map((p, ind) => {
                                  return (
                                    <tr
                                      style={{
                                        background: p.show ? "#f1eded" : "",
                                      }}
                                    >
                                      <td className="p-2 whitespace-nowrap inventory">
                                        <CheckboxGroup
                                          options={[handleid[ind]]}
                                          value={checkedList}
                                          onChange={() =>
                                            onChange([handleid[ind]])
                                          }
                                        />
                                      </td>
                                      {/* <td className="p-2 whitespace-nowrap">
                                <div className="text-left">{ind + 1}</div>
                              </td> */}
                                      <Link href={`/Product/${p._id}`}>
                                        <td className="p-2 whitespace-nowrap">
                                          <div className="flex items-center">
                                            <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                              <img
                                                className="rounded-full"
                                                src={p.thumbnail}
                                                width="40"
                                                height="40"
                                                alt="Alex Shatov"
                                              />
                                            </div>
                                            <div className="font-medium text-gray-800">
                                              {p.shoeName}
                                            </div>
                                          </div>
                                        </td>
                                      </Link>
                                      <td className="p-2 whitespace-nowrap">
                                        <div className="text-left">
                                          {p.styleID}
                                        </div>
                                      </td>
                                      <td className="p-2 whitespace-nowrap">
                                        <div className="text-lg text-center">
                                          $
                                          {Math.round(
                                            listprice[ind]["discount"]
                                          )}
                                        </div>
                                      </td>
                                      <td className="p-2 whitespace-nowrap">
                                        <div
                                          style={{
                                            color:
                                              p.discount_price -
                                                (p.discount_price / 100) *
                                                  discountModal[
                                                    user.isListed > 50
                                                      ? 50
                                                      : user.isListed
                                                  ] <=
                                              p?.purchase
                                                ? "red"
                                                : "green",
                                          }}
                                          className="text-lg text-center"
                                        >
                                          {Math.round(
                                            p.discount_price -
                                              (p.discount_price / 100) *
                                                discountModal[
                                                  user.isListed > 50
                                                    ? 50
                                                    : user.isListed
                                                ] -
                                              p.purchase
                                          ) > 0
                                            ? "$" +
                                              Math.round(
                                                p.discount_price -
                                                  (p.discount_price / 100) *
                                                    discountModal[
                                                      user.isListed > 50
                                                        ? 50
                                                        : user.isListed
                                                    ] -
                                                  p.purchase
                                              )
                                            : "-$" +
                                              Math.abs(
                                                Math.round(
                                                  p.discount_price -
                                                    (p.discount_price / 100) *
                                                      discountModal[
                                                        user.isListed > 50
                                                          ? 50
                                                          : user.isListed
                                                      ] -
                                                    p.purchase
                                                )
                                              )}
                                        </div>
                                      </td>
                                      <td className="p-2 whitespace-nowrap">
                                        <div className="text-lg text-center flex items-center gap-1">
                                          ${Math.round(p?.purchase)}
                                          <i
                                            style={{
                                              color:
                                                checkedList.length > 0
                                                  ? "grey"
                                                  : "",
                                            }}
                                            onClick={(e) =>
                                              checkedList.length > 0
                                                ? console.log()
                                                : showModal(e, p)
                                            }
                                            className="ri-pencil-fill cursor-pointer"
                                          ></i>
                                        </div>
                                      </td>

                                      {/* <td className="p-2 whitespace-nowrap">
                                <div className="text-lg text-center flex items-center gap-1">
                                  {p?.profit_margin}
                                  <i
                                    style={{
                                      color:
                                        checkedList.length > 0 ? "grey" : "",
                                    }}
                                    onClick={(e) =>
                                      checkedList.length > 0
                                        ? console.log()
                                        : show_Profit_Modal(e, p)
                                    }
                                    className="ri-pencil-fill cursor-pointer"
                                  ></i>
                                </div>
                              </td> */}
                                      <td className="p-2 whitespace-nowrap">
                                        <div className="text-lg text-center">
                                          {p?.sold ? (
                                            <span style={{ color: "green" }}>
                                              Sold
                                            </span>
                                          ) : p.show ? (
                                            "Hidden"
                                          ) : (
                                            "Listed"
                                          )}
                                        </div>
                                      </td>
                                      <td className="p-2 whitespace-nowrap">
                                        <div className="text-lg text-center">
                                          {p.size}
                                        </div>
                                      </td>
                                      <td className="p-2 whitespace-nowrap">
                                        <div className="text-lg text-center flex items-center gap-1">
                                          <div
                                            onClick={(e) => {
                                              !p.sold
                                                ? checkedList.length > 0
                                                  ? console.log()
                                                  : handleEdit(e, p)
                                                : console.log();
                                            }}
                                            className="text-lg text-center cursor-pointer"
                                          >
                                            {/* <Link href={`/edit/${p._id}`}> */}
                                            <i
                                              style={{
                                                background: !p.sold
                                                  ? checkedList.length > 0
                                                    ? "grey"
                                                    : "#004490"
                                                  : "grey",
                                              }}
                                              className="ri-pencil-fill custumbt"
                                            ></i>
                                            {/* <i className="ri-pencil-fill custumbt"></i> */}
                                            {/* </Link> */}
                                          </div>
                                        </div>
                                      </td>
                                      <td className="p-2 whitespace-nowrap">
                                        <div
                                          onClick={(e) => {
                                            checkedList.length > 0
                                              ? console.log()
                                              : handleremove(e, p._id, p.show);
                                          }}
                                          className="text-lg text-center cursor-pointer"
                                        >
                                          {/* <Link href={`/edit/${p._id}`}> */}
                                          <i
                                            style={{
                                              background:
                                                checkedList.length > 0
                                                  ? "grey"
                                                  : "red",
                                            }}
                                            className="ri-delete-bin-line custumbt"
                                          ></i>
                                          {/* <i className="ri-pencil-fill custumbt"></i> */}
                                          {/* </Link> */}
                                        </div>
                                      </td>
                                      <td className="p-2 whitespace-nowrap">
                                        <div
                                          onClick={(e) => {
                                            checkedList.length > 0
                                              ? console.log()
                                              : handlehide(e, p._id, !p.show);
                                          }}
                                          className="text-lg text-center cursor-pointer"
                                        >
                                          {p.show ? (
                                            <i
                                              className="ri-eye-off-line custumbt"
                                              style={{
                                                background:
                                                  checkedList.length > 0
                                                    ? "grey"
                                                    : "red",
                                              }}
                                            ></i>
                                          ) : (
                                            <i
                                              style={{
                                                background:
                                                  checkedList.length > 0
                                                    ? "grey"
                                                    : "#004490",
                                              }}
                                              className="ri-eye-line custumbt"
                                            ></i>
                                          )}
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })
                              ) : (
                                <h2 className="font-semibold text-gray-800 text-center">
                                  No Sneakers Added
                                </h2>
                              )}
                            </tbody>
                          </table>
                        </div>
                        <Pagination
                          current={page}
                          onChange={(page) => setPage(page)}
                          total={Math.floor((count / 15) * 10)}
                        />
                      </div>
                    ) : (
                      <div className="px-20 lg:px-24">
                        <div
                          id="shop"
                          className="displaygrid justify-center"
                          style={{ gridTemplateColumns: "repeat(1, 1fr)" }}
                        >
                          <Skeleton active />
                        </div>
                      </div>
                    )}
                  </div>
                  <ToastContainer />
                  <div className="flex flex-col justify-center items-center mt-8">
                    <h2 className="mb-4 text-2xl md:text-3xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                      Import/Export Tutorial
                    </h2>
                    <div
                      style={{
                        height: "300px",
                        maxWidth: "500px",
                        width: "auto",
                      }}
                      className="mx-4 mt-2 md:mx-0 "
                    >
                      <video
                        style={{
                          borderRadius: "5px",
                        }}
                        src={"/videos/inventorytutorail.mp4"}
                        // autoPlay
                        // controls
                        loop
                        type="video/mp4"
                        controls
                        // onPlay={handleVideoPlay}
                        // onPause={handleVideoPause}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          //title="Basic Modal"
          width={1000}
          centered
          open={isModalOpen}
          onCancel={handleCancel}
          footer={[]}
        >
          <div>
            <label
              for="first_name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Edit Purchase Price
            </label>
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Purchase Price"
              onChange={(e) => seteditpurchase(e.target.value)}
              value={editpurchase}
              required
            />
            <button
              onClick={handlePurchasEdit}
              className="grid text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              style={{
                background: "white",
                background: "#011b69",
                color: "#fff",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <span>Save</span>
            </button>
          </div>
        </Modal>
        <Modal
          //title="Basic Modal"
          width={1000}
          centered
          open={isEditModalOpen.open}
          onCancel={handleEditCancel}
          footer={[]}
        >
          <div>
            <label
              for="size"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Size
            </label>
            <input
              type="text"
              id="size"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your Price"
              disabled
              value={isEditModalOpen.data.size}
              required
            />
            <label
              for="first_name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Edit Your Price
            </label>
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your Price"
              onChange={(e) => setedityourprice(e.target.value)}
              value={edityourprice}
              required
            />
            <button
              onClick={handleYourEdit}
              className="grid text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              style={{
                background: "white",
                background: "#011b69",
                color: "#fff",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <span>Save</span>
            </button>
          </div>
        </Modal>
        <Modal
          //title="Basic Modal"
          width={1000}
          centered
          open={isProfitModalOpen}
          onCancel={handleprofitCancel}
          footer={[]}
        >
          <div>
            <label
              for="first_name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Edit Profit Margin
            </label>
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Purchase Price"
              onChange={(e) => seteditprofit(e.target.value)}
              value={editprofit}
              required
            />
            <button
              onClick={handleProfitEdit}
              className="grid text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              style={{
                background: "white",
                background: "#011b69",
                color: "#fff",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <span>Save</span>
            </button>
          </div>
        </Modal>
      </Layout>
    </>
  );
};

export default Inventory;
