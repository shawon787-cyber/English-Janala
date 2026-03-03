const loadLessons = () =>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLessons(json.data))
};
const loadLevelWord = (id) =>{
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    // console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => displayLevelWord(data.data))
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
        <button class="btn bg-sky-50"><i class="fa-solid fa-circle-info"></i></button>
        <button class="btn bg-sky-50"><i class="fa-solid fa-volume-high"></i></button>
      </div>
    </div>
        `;
        wordContainer.append(card);
    })
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
        <button onclick = "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
            <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
          </button>
        `
    // 4. append child
    levelContainer.append(btnDiv)
    }
    
}

loadLessons ();