const stripe = require("stripe")(
  "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"
);
async function StripeAccountCreate(req, res) {
  const { email } = req.body;
  const account = await stripe.accounts.create({
    type: "express",
    country: "US",
    email: email,
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
  });
  const accountId = account.id;
  req.user.stripeAccountId = accountId;
  const accountLink = await stripe.accountLinks.create({
    account: accountId,
    refresh_url: config.publicDomain + "/api/stripe-seller-onboard",
    return_url: config.publicDomain + "/api/stripe-onboard",
    type: "account_onboarding",
  });

  // Redirect to Stripe to start the Express onboarding flow
  res.redirect(accountLink.url);
  //res.json(account);
}
export default StripeAccountCreate;
