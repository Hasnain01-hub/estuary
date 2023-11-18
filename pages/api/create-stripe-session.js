const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function CreateStripeSession(req, res) {
  const { item, price, _id, productId, email } = req.body;
  var arrStr = encodeURIComponent(JSON.stringify(productId));
  //console.log("item", _id.data);
  const redirectURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3005"
      : "https://sneaker-api-phi.vercel.app";

  const transformedItem = item.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: { images: [item.thumbnail], name: item.shoeName },
        unit_amount: Math.round(item.discount_price) * 100,
      },
      quantity: 1,
    };
  });
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: transformedItem,
    customer_email: email,
    shipping_address_collection: {
      allowed_countries: ["US"],
    },
    shipping_options: [
      {
        shipping_rate: "shr_1NfkGCJyTyRe4sdVuHG4nYI1",
      },
    ],
    automatic_tax: {
      enabled: true,
    },

    mode: "payment",
    success_url:
      redirectURL +
      `/updatebuy?status=success&id=${_id.data}&session_id={CHECKOUT_SESSION_ID}&productId=${arrStr}`,
    cancel_url: redirectURL + `/cancelbuy?status=cancel&id=${_id.data}`,
    // metadata: {
    //   images: item.image,
    // },
  });

  res.json({ id: session.id });
}

export default CreateStripeSession;
