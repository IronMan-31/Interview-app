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
    const blob = await resp.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "resume.docx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    console.log("Resume downloaded successfully");
  } catch (err) {
    console.error("Error during fetch:", err);
    return err;
  }
}
export default ResumeRequestHandler;
