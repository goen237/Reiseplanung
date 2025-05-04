import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import TripListPage from "../pages/TripListPage";
import TripDetailPage from "../pages/TripDetailPage";
import CreateTripPage from "../pages/CreateTripPage";
import TripEditPage from "../pages/TripEditPage";
import AddDestinationPage from "../pages/AddDestinationPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <TripListPage /> },
      { path: "/trips/new", element: <CreateTripPage /> },
      { path: "/trips/:id", element: <TripDetailPage /> },
      { path: "/trips/:id/edit", element: <TripEditPage /> },
      { path: "/trips/:id/destinations/new", element: <AddDestinationPage /> },
      { path: "/trips/:id/destinations/:destinationId/edit", element: <AddDestinationPage />},
    ],
  },
]);

export default router;
