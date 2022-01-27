require("dotenv").config({ path: __dirname + "/.env" });

const saveToDB = require("./savetoDB");

const PORT = process.env.PORT || 3000;

const eventsApi = require("@slack/events-api");
const { App } = require("@slack/bolt");

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});
const token = process.env.SLACK_BOT_TOKEN;
const data = {};

const { WebClient, LogLevel } = require("@slack/web-api");
const client = new WebClient(token, {
  logLevel: LogLevel.DEBUG,
});

// Hello Message Bit responds to
app.message("hello", async ({ message, say }) => {
  await say(`Hey there <@${message.user}>!`);
});

// Bot Slash Command
app.command("/bot", async ({ command, ack, say }) => {
  try {
    await ack();
    data.user_id = command.user_id;
    data.user_name = command.user_name;
    // console.log(command.text);
    if (command.text.includes("hello")) {
      say({
        blocks: [
          {
            type: "actions",
            elements: [
              {
                type: "static_select",
                placeholder: {
                  type: "plain_text",
                  text: "Welcome, How are you doing?",
                  emoji: true,
                },
                options: [
                  {
                    text: {
                      type: "plain_text",
                      text: "Doing Well",
                      emoji: true,
                    },
                    value: "Well",
                  },
                  {
                    text: {
                      type: "plain_text",
                      text: "Neutral",
                      emoji: true,
                    },
                    value: "Neutral",
                  },
                  {
                    text: {
                      type: "plain_text",
                      text: "Feeling Lucky",
                      emoji: true,
                    },
                    value: "Lucky",
                  },
                ],
                action_id: "mood",
              },
            ],
          },
        ],
      });
    }
  } catch (error) {
    console.error(error);
  }
});

//Action Id Mood for interactive user response
app.action("mood", async ({ action, ack, say }) => {
  try {
    await ack();
    data.mood = action.selected_option.value;
    say({
      blocks: [
        {
          type: "actions",
          elements: [
            {
              type: "static_select",
              placeholder: {
                type: "plain_text",
                text: "What are your favorite hobbies?",
                emoji: true,
              },
              options: [
                {
                  text: {
                    type: "plain_text",
                    text: "Football",
                    emoji: true,
                  },
                  value: "Football",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "Music",
                    emoji: true,
                  },
                  value: "Music",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "Sleep",
                    emoji: true,
                  },
                  value: "Sleep",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "Movies",
                    emoji: true,
                  },
                  value: "Movies",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "Basketball",
                    emoji: true,
                  },
                  value: "Basketball",
                },
              ],
              action_id: "hobbies",
            },
          ],
        },
      ],
    });
  } catch (error) {
    console.error(error);
  }
});

//Action id Hobbies for Interactive user response
app.action("hobbies", async ({ action, ack, say }) => {
  try {
    await ack();
    data.hobby = action.selected_option.value;
    say("Thank You");
    console.log(await saveToDB(data));
  } catch (error) {
    console.error(error);
  }
});

(async () => {
  // Start the app
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();
