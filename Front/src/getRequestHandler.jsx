async function getRequestHandler(method, url, port = 2000) {
  try {
    let data = await fetch(`http://localhost:${port}${url}`, {
      method: method,
    });
    console.log("Task Done successfully");
    return data;
  } catch (err) {
    console.error("Error during fetch:", err);
    return err;
  }
}
export default getRequestHandler;
