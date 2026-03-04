const createElements = (arr) =>{
    const htmlElements = arr.map(el => `<span class="btn">${el}</span>`)
    return (htmlElements.join(" "));   
}
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const manageSpinner =(status) =>{
    if(status == true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");
    }
    else{
        document.getElementById("spinner").classList.add("hidden");
        document.getElementById("word-container").classList.remove("hidden");
    }
}

const loadLessons = () =>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLessons(json.data))
};
const removeActive =()=>{
    const lessonButtons = document.querySelectorAll(".lesson-btn");
    // console.log(lessonButtons);
    lessonButtons.forEach(btn => btn.classList.remove("active"))
    
}
const loadLevelWord = (id) =>{
    manageSpinner(true);
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    // console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => {
        removeActive();
        const clickBtn = document.getElementById(`lesson-btn-${id}`);
        // console.log(clickBtn)
        clickBtn.classList.add("active");
        displayLevelWord(data.data)
    })
}

const loadWordDetail = async(id)=>{
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    console.log(id);
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data)
};
const displayWordDetails =(word)=>{
    console.log(word)
    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML = `
     <div class="">
        <h2 class="text-2xl font-bold">${word.word} <i class="fa-solid fa-microphone-lines"></i> ${word.pronunciation}</h2>
        
      </div>
      <div>
        <h2 class="font-bold text-gray-600">Meaning</h2>
        <p> ${word.meaning}</p>
      </div>
      <div class="">
        <h2 class="font-bold text-gray-600">Example</h2>
        <p>${word.sentence}</p>
      </div>
      <div class="">
        <h2 class="font-bold text-gray-600">Synonyms</h2>
        <div class="mt-3">${createElements(word.synonyms)}</div>
      </div>
    `;
    document.getElementById("word_modal").showModal();
}

const displayLevelWord = (words) =>{
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";
    if(words.length == 0){
        wordContainer.innerHTML = `
        <div class="text-center col-span-full p-6 rounded-xl">
            <img class="mx-auto mb-5" src="./assets/alert-error.png" alt="">
           <p class="text-gray-500 text-md font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
           <h2 class="text-3xl font-semibold font-bangla mt-3">নেক্সট Lesson এ যান</h2>
         </div>
        `;
        manageSpinner(false);
        return;
    }


    words.forEach(word =>{
        console.log(word);
        const card = document.createElement("div");
        card.innerHTML=`
        <div class="bg-white rounded-lg shadow-sm text-center py-10 px-5">
      <h2 class="text-2xl font-bold">${word. word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
      <p class="font-semibold text-sm my-2 text-gray-600">Meaning/ Pronounciation</p>
      <div class="font-bangla text-xl font-semibold">${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word. pronunciation ? word. pronunciation: "Prounounciation পাওয়া যায়নি"}</div>
      <div class="flex justify-between items-center mt-6">
        <button onclick="loadWordDetail(${word.id})" class="btn bg-sky-50"><i class="fa-solid fa-circle-info"></i></button>
        <button onclick="pronounceWord('${word.word}')" class="btn bg-sky-50"><i class="fa-solid fa-volume-high"></i></button>
      </div>
    </div>
        `;
        wordContainer.append(card);
    });
    manageSpinner(false);
}
const displayLessons = (lessons) =>{
    // 1-get the container & make empty
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";
    // 2.get into every lessons
    for (let lesson of lessons){
        // console.log(lesson);
        
        // 3. create element
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        <button id="lesson-btn-${lesson.level_no}" onclick = "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
            <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
          </button>
        `
    // 4. append child
    levelContainer.append(btnDiv)
    }
    
}

loadLessons ();

document.getElementById("btn-search").addEventListener("click", ()=>{
    removeActive();
    const input = document.getElementById("input-search");
    const searchValue = input.value.trim().toLowerCase(); 
    console.log(searchValue);
    fetch("https://openapi.programming-hero.com/api/words/all")
    .then(res => res.json())
    .then(data =>{
        const allWords = data.data;
        console.log(allWords);
        const filterWords = allWords.filter(word => word.word.toLowerCase().includes(searchValue));
        displayLevelWord(filterWords);
    });
   
    
})