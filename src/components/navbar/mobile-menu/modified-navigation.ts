import navigation from "data/navbarNavigation";

// MODIFY THE NAVIGATION WITH NEW STRUCTURE
export const updateNavigation = navigation.reduce((prev: any[], curr) => {
  const newArr = [...prev];

  if (!("child" in curr)) {
    newArr.push({ ...curr, extLink: true });
  } else {
    newArr.push(curr);
  }

  return newArr;
}, []);
