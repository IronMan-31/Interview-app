async function ResumeRequestHandler(data, URL1) {
  console.log(JSON.stringify(data));
  try {
    const resp = await fetch(
      `https://peacock-splendid-dragon.ngrok-free.app/${URL1}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    return resp;
  } catch (err) {
    console.error("Error during fetch:", err);
    return err;
  }
}
export default ResumeRequestHandler;
