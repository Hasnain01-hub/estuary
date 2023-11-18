var axios = require("axios").default;

async function Putrequest(req, res) {
  const { base64, responseurl, type } = req.body;

  let Put_headersList = {
    Accept: "*/*",
    "Content-Type": type,
  };
  let putOptions = {
    url: responseurl,
    method: "PUT",
    headers: Put_headersList,
    data: base64,
  };

  await axios.request(putOptions);
  res.status(200).json({ message: "success" });
}

export default Putrequest;
