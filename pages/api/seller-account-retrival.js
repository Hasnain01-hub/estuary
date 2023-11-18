const stripe = require("stripe")(
  "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"
);

async function SellerAccountRetrival(req, res) {
  const { id } = req.body;
  const account = await stripe.accounts.retrieve(id);
  res.json(account);
}
export default SellerAccountRetrival;
