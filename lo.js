
document.getElementById("generate-btn").addEventListener("click", () => {
  generateImage();
});
document.getElementById("generate-btn").addEventListener("keydown", (e) => {
  if(e.key === "Enter")
    generateImage();
});
const API_KEY = "fd4d934da00f5c92bc0786418c7ca2095e73ba2178e82308a450ebdcf3bda292f83269f78a87cee4ffef4a7497818bae"; // put your real key here

async function generateImage() {
  const prompt = document.getElementById("text-input").value;
  const loader = document.getElementById("load");
  const resultContainer = document.getElementById("result");
  const container = document.querySelector(".imgcon");

  container.style.display = "flex";
  loader.style.display = "flex";
  resultContainer.style.display = "none";

  try {
    const response = await fetch("https://clipdrop-api.co/text-to-image/v1", {
      method: "POST",
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) throw new Error("Clipdrop API error: " + response.status);

    const blob = await response.blob();
    const imgSrc = URL.createObjectURL(blob);

    resultContainer.innerHTML = `<img src='${imgSrc}' alt='Generated Image'>`;
    loader.style.display = "none";
    resultContainer.style.display = "flex";
  } catch (err) {
    console.error(err);
    loader.style.display = "none";
    resultContainer.innerHTML =
      `<p style="color:red;">Error generating image. Check console.</p>`;
    resultContainer.style.display = "flex";
  }
}

