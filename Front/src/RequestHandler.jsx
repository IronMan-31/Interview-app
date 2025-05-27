async function RequestHandler(method, url1, data, port = 2000) {
  try {
    const resp = await fetch(`http://localhost:${port}${url1}`, {
      method: method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log("Task Done successfully");
    return resp;
  } catch (err) {
    console.error("Error during fetch:", err);
    return err;
  }
}
export default RequestHandler;
