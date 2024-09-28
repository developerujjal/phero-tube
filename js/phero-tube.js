const categoriesData = async () => {
    const respnse = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await respnse.json();
    const allData = data.data
    displayCategories(allData);
}


const displayCategories = (categories) => {
    const categoriesContainer = document.getElementById('categories-container');
    categories.forEach((category) => {

        const btn = document.createElement('button');
        btn.classList.add('category');
        btn.innerText = `${category.category}`;

        btn.onclick = function () {
            cardDataLoading(`${category.category_id}`)
        };

        categoriesContainer.appendChild(btn);

    })


     
    /* Selected button color */
    const allCategories = document.querySelectorAll('.category');
    allCategories.forEach((singelCategory) => {
        singelCategory.addEventListener('click', function (event) {

            // remove the selected color before moveing next
            for(let cate of allCategories){
                cate.style.backgroundColor = '';
                cate.style.color = '';
            }


            const targetValue = event.target;
            targetValue.style.backgroundColor = '#FF1F3D';
            targetValue.style.color = 'white';

        })
    }) 




}



const cardDataLoading = async (categoryID) => {

    loadingSpinner(false);
    
    const respnse = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryID}`);
    const data = await respnse.json();
    const allData = data.data;
    cardVideosDisplay(allData)
}


const cardVideosDisplay = (videoCards) => {
    console.log(videoCards)
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

        // loadingSpinner(true);  // We also can stop spinner here before append the data to the dom

        const newDiv = document.createElement('div');
        newDiv.classList.add('singel-video-main');
        newDiv.innerHTML = `
                        <div class="video-thumb">
                            <img src="${videoCard.thumbnail}" alt="">
                             <div class="video-time-container">
                                <div class="video-timeMain">
                                    <p><span>4 hrs 31 min ago</span></p>
                                </div>
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
                                        <p><span>${videoCard?.others?.views}</span> views</p>
                                    </div>                               
                                </div>
                            </div>
                        </div>
        `;

        videoCardsContainer.appendChild(newDiv);

    })
}





// Loading SPinner
const loadingSpinner = (spinner) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (!spinner) {
        loadingSpinner.classList.remove('hidden');
    }

    else {
        loadingSpinner.classList.add('hidden');
    }
}



cardDataLoading("1000");
categoriesData();