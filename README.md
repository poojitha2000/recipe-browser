# React Recipe Browser

A web application built with React for Browse, filtering, and viewing recipes sourced from TheMealDB API. This project allows users to discover various recipes, filter them by categories and tags, and view detailed cooking instructions, ingredients, and more.

## Features

* **Recipe Discovery:** Displays a comprehensive list of recipes.
* **Pagination:** Browse recipes with a maximum of 6 per page, using "Next" and "Previous" controls.
* **Recipe Cards:** Each recipe in the list shows its name and thumbnail image.
* **Advanced Filtering:**
    * Filter by one or more **categories** (OR logic: e.g., "Seafood" OR "Vegetarian").
    * Filter by one or more **tags** (AND logic: e.g., "Spicy" AND "Quick").
    * Searchable filter options for easy selection of categories and tags.
* **Detailed Recipe View:**
    * Clicking a recipe card opens a dedicated page with:
        * Full recipe name
        * Category
        * Complete cooking instructions
        * Associated tags
        * List of ingredients with measurements
        * Large thumbnail image
* **Seamless Navigation:**
    * A "Back to Recipes" button on the detail page.
    * Previously selected filters and the current page number are preserved when navigating back to the recipe list.
* **User Experience:**
    * Responsive design adapting to different screen sizes (filters on the left for desktop, stacked on top for mobile).
    * Loading indicators during data fetching.
    * Clear error messages if data cannot be loaded.

## API Used

This project fetches its data from **TheMealDB API**:
* API Documentation: [https://www.themealdb.com/api.php](https://www.themealdb.com/api.php)

## Tech Stack

* **React (v18+)**: Core library for building the user interface (using Hooks for state and lifecycle management).
* **JavaScript (ES6+)**: Primary programming language.
* **HTML5**: Structure of the application.
* **CSS3**: Custom styling for layout and appearance (as provided in `src/styles.css`).
* **Vite**: (Likely, based on `main.jsx` structure) Frontend tooling for development server and build.

## Project Structure

The project is organized as follows:

/src
├── components/               # Reusable UI components
│   ├── FilterControls.jsx    # Component for category and tag filter UI
│   ├── PaginationControls.jsx# Component for page navigation
│   ├── RecipeCard.jsx        # Component for displaying a single recipe in a list
│   ├── RecipeDetailPage.jsx  # Component for the detailed view of a recipe
│   └── RecipesPage.jsx       # Component for the main recipe listing and filtering page
├── utils/                    # Utility functions
│   └── fetchData.jsx         # Helper function for making API requests
├── App.jsx                   # Main application component, handles routing and global state
├── main.jsx                  # Entry point of the React application
└── styles.css                # Global and component-specific styles

## Getting Started

To get this project up and running on your local machine, follow these steps:

1.  **Prerequisites:**
    * Node.js (v18.x or later recommended)
    * npm (v9.x or later) or yarn

2.  **Setup:**
    * Place all the project files (including `App.jsx`, `main.jsx`, `styles.css`, and the `components` and `utils` folders) into a new project directory.
    * Open your terminal and navigate to the root of your project directory.

3.  **Install Dependencies:**
    ```bash
    npm install
    ```
    or if you prefer yarn:
    ```bash
    yarn install
    ```

4.  **Run the Development Server:**
    ```bash
    npm run dev
    ```
    or if your setup uses Create React App conventions (less likely given `main.jsx`):
    ```bash
    npm start
    ```
    This will start the development server, typically on `http://localhost:5173` (for Vite) or `http://localhost:3000`. The exact URL will be shown in your terminal.

5.  **Open in Browser:**
    * Open your web browser and navigate to the local URL provided in the terminal.

## How to Use

* **Browse:** Upon loading, the main page displays a list of recipes.
* **Filtering:**
    * Use the filter controls located on the left side (on desktop screens) or at the top (on smaller/mobile screens).
    * You can type into the search boxes within the "Filter by Category" and "Filter by Tag" sections to quickly find specific filter options.
    * Select checkboxes to apply filters. Recipes will update automatically.
* **Pagination:** If there are more than 6 recipes matching your criteria, use the "Previous" and "Next" buttons at the bottom of the recipe list to navigate.
* **Viewing Details:** Click on any recipe card. This will take you to a detailed page for that recipe.
* **Returning to List:** On the recipe detail page, click the "← Back to Recipes" button. You will return to the recipe list with your previously applied filters and page number still active.
