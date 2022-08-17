
  const getSavedJSON = function (itemName) {
    const notesJSON = localStorage.getItem(itemName);
  
    if (notesJSON !== null) {
      return JSON.parse(notesJSON);
    } else {
      return [];
    }
  };
