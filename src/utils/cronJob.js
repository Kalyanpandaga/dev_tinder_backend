const cron = require("node-cron");
const { subDays } = require("data-fns");
const { ConnectionRequest } = require("../models/connectionRequest");

cron.schedule("0 8 * * *", async () => {
  try {
    const yesterday = subDays(new Date(), 1);
    const yesterdayStart = startOfDay(yesterday);
    const yesterdayEnd = endOfDay(yesterday);

    const pendingRequests = ConnectionRequest.find({
      status: "interested",
      createdAt: {
        $gte: yesterdayStart,
        $lt: yesterdayEnd,
      },
    }).populate("fromUserId toUserId");

    const listOfEmails = [
      ...new Set(pendingRequests.map((req) => req.toUserId.emailId)),
    ];
    for (const email of listOfEmails) {
      try {
        const res = await sendEmail.run(
          "new friend requests pending for " + email,
          "There are so many friend requests pending, please login to DevTinder.in"
        );
        console.log(res);
      } catch (err) {
        console.log(err);
      }
      // const res = await sendEmail.run()
    }
  } catch (err) {
    console.error(err);
  }
});
