// Import the SQLite module from "expo-sqlite"
import * as SQLite from "expo-sqlite";

// Open the SQLite database named "little_lemon"
const db = SQLite.openDatabase("little_lemon");

// Function to create a new table named 'menuitems' in the database if it doesn't exist
// It will have fields id (primary key), name, price, description, image, and category
export async function createTable() {
  return new Promise((resolve, reject) => {
    // Run a database transaction
    db.transaction(
      (tx) => {
        // Execute the SQL query to create the table
        tx.executeSql(
          "create table if not exists menuitems (id integer primary key not null, name text, price text, description text, image text, category text);"
        );
      },
      reject, // On transaction error, reject the promise
      resolve // On transaction success, resolve the promise
    );
  });
}

// Function to get all menu items from the 'menuitems' table
export async function getMenuItems() {
  return new Promise((resolve) => {
    // Run a database transaction
    db.transaction((tx) => {
      // Execute the SQL query to get all records from 'menuitems' table
      tx.executeSql("select * from menuitems", [], (_, { rows }) => {
        // If the query success, resolve the promise with the rows obtained
        resolve(rows._array);
      });
    });
  });
}

// Function to save multiple menu items into the 'menuitems' table
export function saveMenuItems(menuItems) {
  db.transaction((tx) => {
    // Execute an SQL query to insert multiple records into 'menuitems' table
    // The values to be inserted are constructed by mapping over 'menuItems' array
    tx.executeSql(
      `insert into menuitems (id, name, price, description, image, category) values ${menuItems
        .map(
          (item) =>
            `("${item.id}", "${item.name}", "${item.price}", "${item.description}", "${item.image}", "${item.category}")`
        )
        .join(", ")}`
    );
  });
}

// Function to get menu items from 'menuitems' table filtered by a query and categories
export async function filterByQueryAndCategories(query, activeCategories) {
  return new Promise((resolve, reject) => {
    // Run a database transaction
    db.transaction((tx) => {
      // Execute an SQL query to get records from 'menuitems' table that match the given query and are in given categories
      tx.executeSql(
        `select * from menuitems where name like ? and category in ('${activeCategories.join(
          "','"
        )}')`,
        [`%${query}%`], // query parameter for the SQL query
        (_, { rows }) => {
          // On query success, resolve the promise with the rows obtained
          resolve(rows._array);
        }
      );
    }, reject); // On transaction error, reject the promise
  });
}
