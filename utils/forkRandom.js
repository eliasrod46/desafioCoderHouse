process.on("message", (msg) => {
  if (msg == "start") {
    process.send({ type: "sum", data: sum });
  }
});
