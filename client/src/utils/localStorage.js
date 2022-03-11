export const getSavedBarIds = () => {
    const savedBarIds = localStorage.getItem('saved_bars')
      ? JSON.parse(localStorage.getItem('saved_bars'))
      : [];
  
    return savedBarIds;
  };
  
  export const saveBarIds = (barIdArr) => {
    if (barIdArr.length) {
      localStorage.setItem('saved_bars', JSON.stringify(barIdArr));
    } else {
      localStorage.removeItem('saved_bars');
    }
  };
  
  export const removeBarId = (barId) => {
    const savedBarIds = localStorage.getItem('saved_bars')
      ? JSON.parse(localStorage.getItem('saved_bars'))
      : null;
  
    if (!savedBarIds) {
      return false;
    }
  
    const updatedSavedBarIds = savedBarIds?.filter((savedBarId) => savedBarId !== barId);
    localStorage.setItem('saved_bars', JSON.stringify(updatedSavedBarIds));
  
    return true;
  };