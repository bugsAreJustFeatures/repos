// import { createBrowserRouter } from "react-router-dom";
// import { useState } from "react";
// import Header from "./Header";
// import HomePage from "./HomePage";
// import ShopPage from "./ShopPage";
// import ErrorPage from "./ErrorPage";

// function Routes() {
//     const [count, setCount] = useState(0)

//     const increaseBasketNumber = () => setCount(a => a + 1)

//     const router = createBrowserRouter([
//         {
//             path: "/",
//             element: <Header count={count} increaseBasketNumber={increaseBasketNumber}/>,
//             errorElement: <ErrorPage />,
//             children: [
//                 {
//                     index: true,
//                     element: <HomePage />,
//                 },
//                 {
//                     path: "shop",
//                     element: <ShopPage />,
//                 }
//             ]
//         }
//     ]);
// }


// export default Routes
