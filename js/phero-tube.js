// Function to load video categories
const categoriesData = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    const allData = data.data;
    displayCategories(allData);
}



// Function to display categories as buttons
const displayCategories = (categories) => {
    const categoriesContainer = document.getElementById('categories-container');
    categories.forEach((category) => {
        const btn = document.createElement('button');
        btn.classList.add('category');
        btn.innerText = `${category.category}`;

        btn.onclick = function () {
            cardDataLoading(`${category.category_id}`);
        };

        categoriesContainer.appendChild(btn);
    });



    // Change button colors when clicked
    const allCategories = document.querySelectorAll('.category');
    allCategories.forEach((singleCategory) => {
        singleCategory.addEventListener('click', function (event) {
            for (let cate of allCategories) {
                cate.style.backgroundColor = '';
                cate.style.color = '';
            }

            const targetValue = event.target;
            targetValue.style.backgroundColor = '#FF1F3D';
            targetValue.style.color = 'white';
        });
    });
}



// Function to load video data for a specific category
const cardDataLoading = async (categoryID) => {
    loadingSpinner(false);

    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryID}`);
    const data = await response.json();
    const allData = data.data;
    cardVideosDisplay(allData);
}


// Function to display video cards
const cardVideosDisplay = (videoCards) => {
    const videoCardsContainer = document.getElementById('videosCard-Container');
    videoCardsContainer.innerHTML = '';

    const notFound = document.getElementById('not-found');
    if (videoCards.length <= 0) {
        loadingSpinner(true);
        notFound.classList.remove('hidden');
    }

    if (videoCards.length > 0) {
        loadingSpinner(true);
        notFound.classList.add('hidden');
    }

    videoCards.forEach((videoCard) => {
        const newDiv = document.createElement('div');
        newDiv.classList.add('singel-video-main');
        newDiv.innerHTML = `
                        <div class="video-thumb">
                            <img src="${videoCard.thumbnail}" alt="">
                                <div id="main-timer" class="video-time-container">
                                     ${videoCard?.others?.posted_date ? `
                                           <div class="video-timeMain">
                                                <p><span>${secondsToHoursMinutes(videoCard?.others?.posted_date)}</span></p>
                                            </div>` : ''}
                                 </div>
                        </div>
                        <div class="video-details-main-container">
                            <div class="video-details-wrapper">
                                <div class="video-channel-logo">
                                    <img src="${videoCard?.authors[0]?.profile_picture}" alt="">
                                </div>
                                <div class="video-detail-others">
                                    <div class="video-title">
                                        <h3>${videoCard.title}</h3>
                                    </div>
                                    <div class="name-and-icon">
                                        <p><span>${videoCard?.authors[0]?.profile_name}</span></p>
                                        <i class="material-icons">verified</i>
                                    </div>  
                                    <div class="views">
                                        <p><span class="views">${videoCard?.others?.views}</span> views</p>
                                    </div>                               
                                </div>
                            </div>
                        </div>
        `;

        videoCardsContainer.appendChild(newDiv);
    });
}



// Loading spinner function
const loadingSpinner = (spinner) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (!spinner) {
        loadingSpinner.classList.remove('hidden');
    } else {
        loadingSpinner.classList.add('hidden');
    }
}


// Convert seconds to hours and minutes
const secondsToHoursMinutes = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours} hrs ${minutes} min and ${remainingSeconds} sec`;
}





// Function to convert view strings to numbers
const convertViewsToNumber = (viewString) => {
    if (viewString.includes('K')) {
        return parseFloat(viewString.replace('K', '')) * 1000;  // 1K = 1000

        /* 
        const num = viewString.replace('K', '');
        const numValue = parseFloat(num);
        return numValue * 1000;  // Multiply by 1000 to convert "K" to thousands
        */



    } else if (viewString.includes('M')) {
        return parseFloat(viewString.replace('M', '')) * 1000000; // 1M = 1,000,000

        /* 
         const num = viewString.replace('M', '');
        const numValue = parseFloat(num);
        return numValue * 1000000;  // Multiply by 1,000,000 to convert "M" to millions

        */
    } else {
        return parseFloat(viewString); // If no K or M, just parse the number
    }
}



// Sort videos by views when button is clicked
const sortVideosByViews = (datas) => {
    datas.sort((a, b) => convertViewsToNumber(b.others.views) - convertViewsToNumber(a.others.views));
    cardVideosDisplay(datas);
}



// Event listener for the sort button
const sortOutBtn = document.getElementById('sortOut');
sortOutBtn.addEventListener('click', async () => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/1000`);
    const data = await response.json();
    const allData = data.data;

    sortVideosByViews(allData);
});





cardDataLoading("1000");
categoriesData();
