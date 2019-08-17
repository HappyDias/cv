function orderByDate(a,b){
  if(a.year < b.year) return -1;
  if(a.year > b.year) return 1;
  return 0;
}

function homogenize(obj){
  const toReturn = {...obj};
  const testKeys = {
    year : ['date'],
    url : ['adsurl'],
    journal: ['journaltitle', 'booktitle']
  }

  Object.keys(testKeys).forEach(testKey =>{
    if(!(testKey in toReturn)){
      testKeys[testKey].forEach(checkKey =>{
        if(toReturn[checkKey]){
          toReturn[testKey] = toReturn[checkKey];
        }
      })
    }
  })

  if(toReturn.author[0].includes('Dias')){
    toReturn['authType'] = 'Main Author'
  }
  else{
    toReturn['authType'] = 'Co-Author'
  }

  return toReturn;
}

function order(a,b){
  const orders = {
    "Interests" : 0,
    "Education" : 1,
    "Experience" : 2,
    "Skills" : 3,
    "Language" : 4,
    "Publications" : 5,
  }

  return orders[a] - orders[b];
}

export {orderByDate, homogenize, order};