// Import necessary hooks
import { useRef, useEffect } from "react";

// The getSectionListData function convert data into a form suitable for a SectionList component
export function getSectionListData(data) {
  // restructured is an empty array to store the restructured data
  let restructured = [];
  // Loop over each item in the input data
  data.map((item) => {
    // Try to find an object in the restructured data that matches the category of the current item
    let obj = restructured.find(
      (x) =>
        x.name == item.category.charAt(0).toUpperCase() + item.category.slice(1)
    );
    // If an object was found
    if (obj) {
      // Add the current item to the data array of the found object
      restructured[restructured.indexOf(obj)].data.push({
        id: item.id,
        name: item.name,
        price: item.price,
        description: item.description,
        image: item.image,
      });
    } else {
      // If no object was found, create a new one with the current item as its only data
      restructured.push({
        name: item.category.charAt(0).toUpperCase() + item.category.slice(1),
        data: [
          {
            id: item.id,
            name: item.name,
            price: item.price,
            description: item.description,
            image: item.image,
          },
        ],
      });
    }
  });
  // Return the restructured data
  return restructured;
}

// Custom hook that triggers an effect only on updates, not on the initial mount
export function useUpdateEffect(effect, dependencies = []) {
  // ref that keeps track of whether it's the initial mount or not
  const isInitialMount = useRef(true);

  // useEffect that runs on every render
  useEffect(() => {
    // On the initial mount, update the ref to false and do nothing else
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      // On updates, run the provided effect function
      return effect();
    }
  }, dependencies); // The effect will run every time a dependency changes
}
