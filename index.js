const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/testimonial", (req, res) => {
  res.json([
    {
      image: "https://i.pinimg.com/564x/27/9a/a6/279aa6ae9fe65c86c5bd04c9443b098c.jpg",
      content: "Gon!",
      author: "-Killua-",
      rating: 5,
    },
    {
      image: "https://sportshub.cbsistatic.com/i/2021/08/09/b6fa15e8-0a86-4c77-b602-bb22b59c4bac/naruto-kakashi-cosplay-1274250.jpg",
      content: "Obito??",
      author: "Kakashi Hatatake",
      rating: 4,
    },
    {
      image: "https://i.pinimg.com/736x/e7/35/00/e735009e177254bafbbafc73b3cb0c62.jpg",
      content: "Ha ha ha ha ha ha",
      author: "Kaneki",
      rating: 1,
    },
    {
      image: "https://qph.cf2.quoracdn.net/main-qimg-450e90188a9dfa21612be67816e7793b-lq",
      content: "U are mine Guts",
      author: "griffith",
      rating: 2,
    },
    {
      image: "https://images7.alphacoders.com/134/thumb-1920-1348055.png",
      content: "I Will not use my fire power",
      author: "Todoroki",
      rating: 5,
    },
    {
      image: "https://i.pinimg.com/736x/3f/c1/a6/3fc1a671cfd2cd05c02a3bd5a7dc7ee2.jpg",
      content: "Bankai Daiguren Hyorinmaru ",
      author: "Hitsugaya Toshiro",
      rating: 5,
    },
  ]);
});
