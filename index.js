require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
// const app = express();

const PORT = process.env.PORT || 3000;

const eventsApi = require("@slack/events-api");
const { App } = require("@slack/bolt");
// const slackEvents = eventsApi.createEventAdapter(
//   process.env.SLACK_SIGNING_SECRET
// );
// console.log(process.env.SEREN_TOKEN);
const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
  // socketMode: true,
  // appToken: process.env.SEREN_TOKEN,
});
const token = process.env.SLACK_BOT_TOKEN;

const { WebClient, LogLevel } = require("@slack/web-api");
const client = new WebClient(token, {
  logLevel: LogLevel.DEBUG,
});

app.message("hello", async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  await say(`Hey there <@${message.user}>!`);
});

app.message("time", async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  await say(
    `Hey there <@${message.user}>! the time is <${Date.now().toLocaleString()}`
  );
});

(async () => {
  // Start the app
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();

// app.listen(PORT, () => {
//   console.log(`App listening at http://localhost:${PORT}`);
// });
