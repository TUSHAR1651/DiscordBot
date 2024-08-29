if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { Client, GatewayIntentBits } = require("discord.js");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const { UrlRoute } = require("./UrlRoute");
const Url = require("./UrlModel");

const MongoUrl = process.env.MONGO_URL;
mongoose.connect(MongoUrl).then(() => {
    console.log("Connected to MongoDB");
});

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith("create")) {
    const [create, url] = message.content.split(" ");

    if (!url) {
      return message.reply("Please provide a URL.");
    }

    const shortUrl = Math.random().toString(36).substring(2, 7);
    const newUrl = new Url({
      url,
      shortUrl,
    });

    try {
      await newUrl.save();
      return message.reply({
        content: `Your short URL is: localhost:3000/${shortUrl}`,
      });
    } catch (error) {
      console.error("Error saving URL:", error);
      return message.reply("There was an error saving your URL.");
    }
  }

  message.reply({
    content: "Hi from Bot",
  });
});

const PORT = 3000;

app.use(express.json());
app.use("/", UrlRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


const DiscordToken = process.env.DISCORD_TOKEN;
client.login(DiscordToken);
