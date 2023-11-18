const stripe = require("stripe")(
  "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"
);

async function StripeAccountOnboard(req, res) {
  try {
    // Retrieve the user's Stripe account and check if they have finished onboarding
    const account = await stripe.account.retrieve(req.user.stripeAccountId);
    if (account.details_submitted) {
      req.user.onboardingComplete = true;
      //   await req.user.save();

      // Redirect to the Rocket Rides dashboard
      req.flash("showBanner", "true");
      const loginLink = await stripe.accounts.createLoginLink(account.id, {
        redirect_url: config.publicDomain + "/pilots/dashboard",
      });
      // Directly link to the account tab
      if (req.query.account) {
        loginLink.url = loginLink.url + "#/account";
      }
      // Retrieve the URL from the response and redirect the user to Stripe
      return res.redirect(loginLink.url);
    } else {
      console.log("The onboarding process was not completed.");
      res.redirect("/pilots/signup");
    }
  } catch (err) {
    console.log("Failed to retrieve Stripe account information.");
    console.log(err);
    next(err);
  }
}
export default StripeAccountOnboard;
