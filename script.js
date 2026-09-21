const searchForm = document.getElementById("search-form");
const submitBtn = document.getElementById("submit-data");
const inputShow = document.getElementById("input-show");
const showContainer = document.querySelector(".show-container");

async function handleSearch(event) {
    if (event) event.preventDefault();
    const query = inputShow.value;
    if (!query) return;

    // Gotten from the assignment instructions: do NOT use encodeURIComponent()
    // so i used this: https://api.tvmaze.com/search/shows?q=:query
    const url = `https://api.tvmaze.com/search/shows?q=${query}`;

    try {
        // followed this fetch guide on youtube: https://youtu.be/Oive66jrwBs?si=bilPOYAD_tK060H4
        const response = await fetch(url);
        const shows = await response.json();

        // this helps clear previous results before displaying the new ones
        showContainer.innerHTML = "";

        shows.forEach(item => {
            const show = item.show;

            // this is the Main card wrapper
            const showData = document.createElement("div");
            showData.classList.add("show-data");

            // this Shows image
            const img = document.createElement("img");
            if (show.image && show.image.medium) {
                img.src = show.image.medium;
            } else {
                img.src = "";
            }
            img.alt = show.name || "Show image";

            // this is the Info wrapper
            const showInfo = document.createElement("div");
            showInfo.classList.add("show-info");

            // Title
            const title = document.createElement("h1");
            title.textContent = show.name;

            // the API wraps the summary in the <p> tag like the question said
            const summaryContainer = document.createElement("div");
            if (show.summary) {
                summaryContainer.innerHTML = show.summary;
            } else {
                const emptyP = document.createElement("p");
                emptyP.textContent = "No description available.";
                summaryContainer.appendChild(emptyP);
            }

            // Gathers the information block together
            showInfo.appendChild(title);
            while (summaryContainer.firstChild) {
                showInfo.appendChild(summaryContainer.firstChild);
            }

            // this gathers the img and information block together
            showData.appendChild(img);
            showData.appendChild(showInfo);

            // adds showData to the showContainer in the HTML
            showContainer.appendChild(showData);
        });
    } catch (error) {
        console.error("Error fetching shows:", error);
    }
}

searchForm.addEventListener("submit", handleSearch);
if (submitBtn) {
    submitBtn.addEventListener("click", handleSearch);
}