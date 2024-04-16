export const config = {
  stripe: {
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    plans: {
      free: {
        priceId: 'price_1P5z7lEDz3g9moGYYlgN9AlZ',
        quota: {
          TASKS: 100,
        },
      },
      pro: {
        priceId: 'price_1P5z85EDz3g9moGYUbJuhsdj',
        quota: {
          TASKS: 20000,
        },
      },
    },
  },
}
