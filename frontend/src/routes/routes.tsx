import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFound from "../components/NotFoundComponent/NotFound";
import AddDestinationPage from "../pages/DestinationsPages/AddDestinationPage";
import DestinationsPage from "../pages/DestinationsPages/DestinationsPage";
import CreateTripPage from "../pages/TripsPages/CreateTripPage";
import TripDetailPage from "../pages/TripsPages/TripDetailPage";
import TripEditPage from "../pages/TripsPages/TripEditPage";
import TripListPage from "../pages/TripsPages/TripListPage";
import TripsByDestination from "../pages/TripsPages/TripsByDestination";
import EditDestinationPage from "../pages/DestinationsPages/EditDestinationPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <TripListPage /> },
      { path: "/trips/new", element: <CreateTripPage /> },
      { path: "/trips/:id", element: <TripDetailPage /> },
      { path: "/trips/:id/edit", element: <TripEditPage /> },
      { path: "/trips/by/destination", element: <TripsByDestination /> },
      { path: "/trips/:id/destinations/new", element: <AddDestinationPage /> },
      { path: "/trips/:id/destinations/:destinationId/edit", element: <EditDestinationPage />},
      { path: "/destinations", element: <DestinationsPage /> },
      { path: "/destinations/new", element: <AddDestinationPage /> },
      { path: "/destinations/:id/edit", element: <EditDestinationPage /> },
      { path: "*", element: <NotFound />},
    ],
  },
]);

export default router;
