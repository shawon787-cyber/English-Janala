
const createElements = (arr) =>{
    const htmlElements = arr.map(el => `<span class="btn">${el}</span>`);
    return (htmlElements.join(" "));
    
}

const synonyms = ["hi", "hello", "how"];
createElements(synonyms)