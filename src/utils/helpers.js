//Function to filter an object

export function filterObject(object){
    return Object.keys(object).map((key, index) => object[key]);
}

export  function getDayName(day){
    const array = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return array[day];
}