import React, { useState, useEffect } from "react";
import { clsx } from "clsx";
import { useSpring, animated, config } from "react-spring";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import {
  LineChart,
  BarChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import discountModal from "../../components/misc/discountModal.js";
import { db } from "../../utils/Firebase";
import Link from "next/link.js";
const map = (value, sMin, sMax, dMin, dMax) => {
  return dMin + ((value - sMin) / (sMax - sMin)) * (dMax - dMin);
};
const pi = Math.PI;
const tau = 2 * pi;

function Dashboard({ user }) {
  const [selectedInterval, setSelectedInterval] = useState("1d");
  const [rawData, setRawdata] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  React.useEffect(() => {
    if (!user && !user?.email) {
      window.location.href = "/";
    } else {
      return;
    }
  }, [user]);
  useEffect(() => {
    const fetchUserData = async (user) => {
      if (user && user.email) {
        const res = await axios.get(
          `https://sneaker-api-phi.vercel.app/get-expense/${user.email}`
        );
        setRawdata(res.data);
      }
    };
    fetchUserData(user);
  }, [user]);

  const getLabelForInterval = (timestamp, interval) => {
    const date = new Date(timestamp);

    if (interval === "1d") {
      return `${date.getHours()}:00`;
    } else if (interval === "1w") {
      return date.toLocaleDateString("en-US", { weekday: "short" });
    } else if (interval === "1m") {
      return date.toLocaleDateString("en-US", { month: "short" });
    } else {
      return date.getFullYear().toString();
    }
  };
  // Dynamic labels based on the selected interval
  // const labels = generateLabels(selectedInterval);

  // Aggregate data for each unique label
  var aggregatedData;
  if (filteredData.length > 0) {
    aggregatedData = filteredData.reduce((accumulator, item) => {
      const label = getLabelForInterval(item.timestamp, selectedInterval);

      // Check if the label is already in the accumulator
      if (accumulator[label]) {
        accumulator[label].revenue += item.total_price; // Aggregate revenue for the same label
      } else {
        accumulator[label] = {
          name: label,
          revenue: item.total_price,
        };
      }

      return accumulator;
    }, {});

    // Convert the aggregated data back to an array for rendering the graph data
  } else {
    const generateLabels = (interval) => {
      const date = new Date();

      if (interval === "1d") {
        return `${date.getHours()}:00`;
      } else if (interval === "1w") {
        return date.toLocaleDateString("en-US", { weekday: "short" });
      } else if (interval === "1m") {
        return date.toLocaleDateString("en-US", { month: "short" });
      } else {
        return date.getFullYear().toString();
      }
    };

    // Dynamic labels based on the selected interval
    const labels = generateLabels(selectedInterval);

    // Generate dummy data with zero values
    aggregatedData = [labels].reduce((accumulator, label) => {
      accumulator[label] = {
        name: label,
        revenue: 0,
      };
      return accumulator;
    }, {});
  }
  const graphData = Object.values(aggregatedData);
  // Function to get label based on the timestamp and selected interval

  useEffect(() => {
    // Function to filter data based on the selected interval
    const filterData = () => {
      const now = new Date();
      if (selectedInterval == "all") {
        setFilteredData(rawData);
        return;
      }
      let cutoffDate;

      if (selectedInterval === "1d") {
        cutoffDate = new Date(now - 1 * 24 * 60 * 60 * 1000); // 1 day ago
      } else if (selectedInterval === "1w") {
        cutoffDate = new Date(now - 7 * 24 * 60 * 60 * 1000);
      } else if (selectedInterval === "1m") {
        cutoffDate = new Date(now - 30 * 24 * 60 * 60 * 1000);
      }

      const filtered = rawData.filter(
        (item) => new Date(item.timestamp) >= cutoffDate
      );
      setFilteredData(filtered);
    };
    filterData();
  }, [selectedInterval, rawData]);

  const [topUserData, setTopUserdata] = useState([]);

  const [totalsold, settotalsold] = React.useState(0);
  const [totoal_prof, settotoal_prof] = React.useState(0);
  const [listvalue, setlistvalue] = React.useState(0);
  useEffect(() => {
    const fetchUserData = async () => {
      const querySnapshot = await db
        .collection("users")
        .orderBy("isListed", "desc")
        .limit(3)
        .get();
      querySnapshot.forEach((doc) => {
        setTopUserdata((prev) => {
          return [...prev, doc.data()];
        });
      });
    };
    fetchUserData();
    return () => {
      setTopUserdata([]);
    };
  }, []);

  useEffect(() => {
    const getdat = async (user) => {
      if (user && user.email) {
        const res = await axios.get(
          `https://sneaker-api-phi.vercel.app/getsneakerbyemail/${user.email}`
        );
        const data = await res.data;
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
      }
    };
    getdat(user);
    return () => {
      settotalsold(0);
      setlistvalue(0);
      settotoal_prof(0);
    };
  }, [user]);
  const Data = [
    {
      _id: "1",
      type: "Sold",
      data: totalsold,
      subtitle: "Sold Value",
    },
    {
      _id: "2",
      type: "Inventory",
      data: Math.round(listvalue),
      subtitle: "Listed Value",
    },
    {
      _id: "3",
      type: "Profit",
      data: Math.round(totoal_prof),
      // monthly: 2 + 2 / 16,
      subtitle: "Total Profit",
    },
  ];
  return (
    <div className="flex w-full">
      {/* {console.log(filteredData, "filteredData")} */}
      <div className="  flex-grow overflow-x-hidden overflow-auto flex flex-wrap  content-start p-2 sm:overflow-y-hidden ">
        <div className="w-full sm:flex p-2 items-end">
          <div className="sm:flex-grow flex justify-between">
            <div className="">
              <div className="flex items-center">
                <div className="text-3xl font-bold text-white capitalize">
                  Hello {(user && user.name) || "John"}
                </div>
              </div>
              <div className="flex items-center">
                <Icon
                  path="res-react-dash-date-indicator"
                  className="w-3 h-3"
                />
                <div className="ml-2">Joined Date {user && user.date}</div>
              </div>
            </div>
          </div>
        </div>
        {/* Top Users with higest sneaker listed */}
        {topUserData.map(({ name, url, isListed, date, _id }) => (
          <TopUserCard
            key={_id}
            name={name}
            url={url}
            coins={isListed}
            createdAt={date}
          />
        ))}
        {/*inventory metrics */}
        {Data.map((item) => {
          return (
            <UserData
              key={item._id}
              type={item.type}
              data={item.data}
              monthly={item.monthly}
              subtitle={item.subtitle}
            />
          );
        })}

        <div className="w-full p-2 lg:w-2/3">
          <div className="rounded-lg bg-card sm:h-80 h-60">
            <Graph
              selectedInterval={selectedInterval}
              graphData={graphData}
              setSelectedInterval={setSelectedInterval}
            />
          </div>
        </div>
        <div className="w-full p-2 lg:w-1/3">
          <div className="rounded-lg bg-card h-80">
            <PurchaseCoins user={user} />
          </div>
        </div>

        {/* <div className="w-full p-2 lg:w-2/3">
          <div className="rounded-lg bg-card h-80">
            <Segmentation user={user} />
          </div>
        </div> */}

        {/* <div className="w-full p-2 lg:w-1/3">
          <div className="rounded-lg bg-card overflow-hidden h-80">
            <TopCurrencies data={data} />
          </div>
        </div> */}
      </div>
    </div>
  );
}
function Graph({ selectedInterval, graphData, setSelectedInterval }) {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <div className="rounded-xl overflow-hidden tooltip-head">
          {/* {console.log(dataPoint, "props")} */}
          <div className="flex items-center  p-1">
            <div className="">Revenue</div>
            <Icon path="res-react-dash-options" className="w-2 h-2" />
          </div>
          <div className="tooltip-body text-left p-1">
            <div className="text-white font-bold">{dataPoint.name}</div>
            <div className="text-white font-bold">
              ${dataPoint.revenue.toFixed(1)}
            </div>
            {/* <div className="">
              Expected Revenue ${dataPoint.expectedRevenue.toFixed(1)}
            </div> */}
          </div>
        </div>
      );
    }
  };
  return (
    <div className="flex p-4 h-full flex-col">
      <div className="">
        <div className="flex items-center">
          <div className="font-bold text-white">Your Expenses</div>
          <div className="flex-grow" />

          <Icon path="res-react-dash-graph-range" className="w-4 h-4" />
          <div className="ml-2 flex gap-2 ">
            <button
              className={clsx(
                "px-2",
                "rounded-lg",
                selectedInterval == "1d" ? "text-primarycolor" : "text-card",
                selectedInterval == "1d" ? "bg-blue-200" : "bg-primarycolor"
              )}
              onClick={() => setSelectedInterval("1d")}
            >
              1d
            </button>
            <button
              className={clsx(
                "px-2",
                "rounded-lg",
                selectedInterval == "1w" ? "text-primarycolor" : "text-card",
                selectedInterval == "1w" ? "bg-blue-200" : "bg-primarycolor"
              )}
              onClick={() => setSelectedInterval("1w")}
            >
              1w
            </button>
            <button
              className={clsx(
                "px-2",
                "rounded-lg",
                selectedInterval == "1m" ? "text-primarycolor" : "text-card",
                selectedInterval == "1m" ? "bg-blue-200" : "bg-primarycolor"
              )}
              onClick={() => setSelectedInterval("1m")}
            >
              1m
            </button>
            <button
              className={clsx(
                "px-2",
                "rounded-lg",
                selectedInterval == "all" ? "text-primarycolor" : "text-card",
                selectedInterval == "all" ? "bg-blue-200" : "bg-primarycolor"
              )}
              onClick={() => setSelectedInterval("all")}
            >
              All
            </button>
          </div>
        </div>
        <div className="font-bold ml-5">
          {graphData[0] && graphData[0].name} -{" "}
          {graphData[graphData.length - 1] &&
            graphData[graphData.length - 1].name}
        </div>
      </div>

      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={500} height={300} data={graphData}>
            <defs>
              <linearGradient id="paint0_linear" x1="0" y1="0" x2="1" y2="0">
                <stop stopColor="#6B8DE3" />
                <stop offset="1" stopColor="#7D1C8D" />
              </linearGradient>
            </defs>
            {/* <CartesianGrid
              horizontal={false}
              strokeWidth="6"
              stroke="#424455"
            /> */}
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tickMargin={10}
            />
            <YAxis axisLine={false} tickLine={false} tickMargin={10} />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Line
              activeDot={false}
              type="monotone"
              dataKey="expectedRevenue"
              stroke="#242424"
              strokeWidth="3"
              dot={false}
              strokeDasharray="8 8"
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="url(#paint0_linear)"
              strokeWidth="4"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
function UserData({ type, data, subtitle, monthly }) {
  const { transactions } = useSpring({
    transactions: data,

    from: { transactions: 0 },
  });

  return (
    <div className="w-full p-2 lg:w-1/3">
      <div className="rounded-lg bg-card flex justify-between p-3 h-32">
        <div className="">
          <div className="flex items-center">
            <div className="ml-2">
              <div className="flex items-center">
                <div className="mr-2 font-bold text-white">{type}</div>
                <Icon path="res-react-dash-tick" />
              </div>
              <div className="text-sm ">
                {monthly ? "Monthly Profit " + "$" + monthly.toFixed(2) : ""}{" "}
              </div>
            </div>
          </div>

          <div className="text-sm font-medium  mt-2">{subtitle}</div>
        </div>
        <div className="flex flex-col items-center">
          <Icon path={"res-react-dash-bull"} className="w-8 h-8" />
          <animated.div
            className={clsx("text-green-500", "font-bold", "text-lg")}
          >
            {type == "Investment" || type == "Profit"
              ? "$" + data
              : transactions.interpolate((i) => `${i.toFixed(0)}`)}
          </animated.div>
        </div>
      </div>
    </div>
  );
}
function TopUserCard({ name, url, coins, createdAt }) {
  const dateObj = new Date(createdAt);
  const { transactions } = useSpring({
    transactions: coins,
    // barPlayhead: 1,
    from: { transactions: 0 },
  });
  const month = dateObj.toLocaleString("en-US", { month: "long" });
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  const formattedDate = `${month} ${day}, ${year}`;
  return (
    <div className="w-full p-2 lg:w-1/3">
      <div className="rounded-lg bg-card flex justify-between p-3 h-32">
        <div className="">
          <div className="flex items-center">
            <div className="ml-2">
              <div className="flex items-center">
                <img
                  src={url}
                  className="w-10 rounded-2xl p-1"
                  referrerPolicy="no-referrer"
                />
                &nbsp;
                <div className="mr-2 font-bold text-white">{name}</div>
                <Icon path="res-react-dash-tick" />
              </div>
            </div>
          </div>
          {/* <div className="text-sm ">{email} </div> */}

          <div className="text-sm font-medium  mt-2">{`Joined on ${formattedDate}`}</div>
        </div>
        <div className="flex flex-col items-center">
          <Icon path={"res-react-dash-bull"} className="w-8 h-8" />
          <animated.div
            className={clsx("text-green-500", "font-bold", "text-lg")}
          >
            {transactions.interpolate((i) => `${i.toFixed(0)}`)}
          </animated.div>
        </div>
      </div>
    </div>
  );
}

function TopCurrencies({ data }) {
  return (
    <div className="flex p-4 flex-col h-full">
      <div className="flex justify-between items-center">
        <div className="text-white font-bold">Crypto Prices</div>
        <Icon path="res-react-dash-plus" className="w-5 h-5" />
      </div>
      {/* <div className="">from </div> */}
      <div
        style={{
          overflowY: "auto",
        }}
      >
        {data.map(({ name, type, quote, id }) => (
          <div className="flex items-center mt-3" key={id}>
            <div className="">{name}</div>
            <div className="flex-grow" />
            <div className="">{`${quote.USD.price.toLocaleString()} USD.`}</div>
          </div>
        ))}
      </div>
      <div className="flex-grow" />
      <div className="flex justify-center">
        <div
          // onClick={() => setCheck((prev) => !prev)}
          className=" cursor-pointer"
        >
          {/* Check All */}
        </div>
      </div>
    </div>
  );
}

function Segmentation({ user }) {
  const [Transcation, setTranscation] = useState([]);

  return (
    <div
      className="p-4 h-full"
      style={{ scrollBehavior: "smooth", overflowY: "scroll" }}
    >
      <div className="flex justify-between items-center">
        <div className="text-white font-bold">Transaction</div>

        <Icon path="res-react-dash-options" className="w-2 h-2" />
      </div>
      <div>
        {Transcation.length > 0 ? (
          Transcation.map((item, idx) => (
            <div
              className="flex items-center mt-3"
              key={idx}
              style={{ justifyContent: "space-between", padding: "10px" }}
            >
              <div className="">{idx + 1}</div>
              <div className="ml-2">{item.quantity} qty</div>
              <div className="ml-2">{item.type}</div>
              <div className="ml-2">{item.status}</div>
              <div className="ml-2">
                {new Date(item.updatedAt ?? item.date).toLocaleDateString()}
              </div>
              {/* <div className="flex-grow" /> */}
              <div className="">
                {`$ ${item.total_price}`}
                <Icon
                  path={"res-react-dash-country-up"}
                  className="w-4 h-4 mx-3"
                />
              </div>

              <Icon path="res-react-dash-options" className="w-2 h-2" />
            </div>
          ))
        ) : (
          <div className="text-white font-bold text-center">No Transaction</div>
        )}
      </div>
    </div>
  );
}

function PurchaseCoins({ user }) {
  return (
    <div>
      <div className="w-full h-20 add-component-head" />
      <div
        className="flex flex-col items-center"
        style={{
          transform: "translate(0, -60px)",
        }}
      >
        <div
          className=""
          style={{
            background: "#414455",
            width: "80px",
            height: "80px",
            borderRadius: "999px",
          }}
        >
          <img
            src="https://assets.codepen.io/3685267/res-react-dash-rocket.svg"
            alt=""
            className="w-full h-full"
          />
        </div>
        <div className="flex justify-between items-center gap-2">
          <div className="text-white font-bold ">Current fees </div>
          <Icon path="res-react-dash-bull" className="w-8 h-8" />
        </div>

        <animated.div
          className={clsx("text-green-500", "font-bold", "text-lg")}
        >
          {user && user.isListed > 50
            ? 0
            : discountModal[user && user.isListed]}
          % Fees
        </animated.div>
        {/* <animated.div
            className={clsx("text-green-500", "font-bold", "text-lg")}
          >
            Profit ${(user && user.coins) || 0} (16 months)
          </animated.div> */}
        {/* <animated.div
          className={clsx("text-green-500", "font-bold", "text-lg")}
        >
          <input
            type="number"
            name="company_website"
            id="company_website"
            value={qnty}
            className="pl-12 py-2 pr-2 block w-full rounded-lg border-gray-300 bg-card"
            placeholder="Gpay"
            onChange={(e) => setqnty(e.target.value)}
          />
        </animated.div> */}
        {/* <div className="mt-2">30 USDT</div>
          <div className="mt-1">$30.14 USD</div> */}
        <div className="flex flex-row gap-2">
          <div
            className="flex items-center p-3 mt-3"
            style={{
              background: "#2f49d1",
              borderRadius: "15px",
              padding: "8px 15px",
              justifyContent: "center",
              color: "white",
              cursor: "pointer",
            }}
          >
            <Link href="/form/addsneaker">
              <div className="ml-2">List now</div>
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

function Icon({ path = "options", className = "w-4 h-4" }) {
  return (
    <img
      src={`https://assets.codepen.io/3685267/${path}.svg`}
      alt=""
      className={clsx(className)}
    />
  );
}

function IconButton({
  onClick = () => {},
  icon = "options",
  className = "w-4 h-4",
}) {
  return (
    <button onClick={onClick} type="button" className={className}>
      <img
        src={`https://assets.codepen.io/3685267/${icon}.svg`}
        alt=""
        className="w-full h-full"
      />
    </button>
  );
}

export default Dashboard;
