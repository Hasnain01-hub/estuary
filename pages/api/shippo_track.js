import axios from "axios";

async function ShippoTrack(req, res) {
  const { carrier, tracking_number } = req.body;

  const data = await axios.get(
    `https://api.goshippo.com/tracks/usps/${tracking_number}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "ShippoToken shippo_live_a35380e1e83051bc48f17fe3ef94bb686d4de987",
      },
    }
  );

  res.json({ response: data.data });
}

export default ShippoTrack;
