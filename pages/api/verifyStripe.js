// import handleErrors from "@/api/middlewares/handleErrors";
// import createError from "@/api/utils/createError";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function Handler(req, res) {
  const { body } = req.body;

  const result = await stripe.oauth
    .token({
      grant_type: "authorization_code",
      code: body,
    })
    .catch((err) => {
      throw console.error(err);
    });
  //console.log(result, "result");
  const account = await stripe.accounts
    ?.retrieve(result?.stripe_user_id)
    ?.catch((err) => {
      throw console.error(err);
    });
  //console.log(account, "account");
  const accountAnalysis = {
    hasConnectedAccount: !!account?.id,
    accountId: account?.id,
    hasCompletedProcess: account?.details_submitted,
    isValid: account?.charges_enabled && account?.payouts_enabled,
    displayName:
      account?.settings?.dashboard?.display_name ||
      account?.display_name ||
      null,
    country: account?.country,
    currency: account?.default_currency,
  };

  const shouldAllowUnlink =
    accountAnalysis?.hasConnectedAccount &&
    (!accountAnalysis?.isValid ||
      !accountAnalysis?.hasCompletedProcess ||
      !accountAnalysis?.displayName);

  console.log(account, "stripe");
  res
    .status(200)
    .json({ account, oauth: result, accountAnalysis, shouldAllowUnlink });
}

export default Handler;
