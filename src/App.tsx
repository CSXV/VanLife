import "./App.css";
import "./Components/server.js";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Vans, { loader as vansLoader } from "./Components/Vans";
import VanDetail, { loader as vanDetailLoader } from "./Components/VanDetail";
import HostVans, { loader as hostVans } from "./Components/Host/HostVans";
import HostVanDetail, {
  loader as hostVanDetail,
} from "./Components/Host/HostVanDetail";
import Dashboard from "./Components/Host/Dashboard";
import HostVanInfo from "./Components/Host/HostVanInfo";
import HostVanPricing from "./Components/Host/HostVanPricing";
import HostVanPhotos from "./Components/Host/HostVanPhotos";

import HostLayout from "./Components/Host/HostLayout";
import Layout from "./Components/Layout";

import About from "./Components/About";
import Reviews from "./Components/Host/reviews";
import Income from "./Components/Host/Income";

import Home from "./Components/Home";
import NotFound from "./Components/NotFound";
import Error from "./Components/Error";
import Login, {
  loginLoader,
  action as loginAction,
} from "./Components/Login.js";
import { requireAuth } from "./Components/Utils.js";

// ---------------------------------------------------------------------------------
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />

      <Route path="about" element={<About />} />

      <Route
        loader={loginLoader}
        action={loginAction}
        path="login"
        element={<Login />}
        errorElement={<Error />}
      />

      <Route
        path="vans"
        element={<Vans />}
        loader={vansLoader}
        errorElement={<Error />}
      />

      <Route
        path="vans/:id"
        loader={vanDetailLoader}
        element={<VanDetail />}
        errorElement={<Error />}
      />

      <Route path="host" element={<HostLayout />}>
        <Route
          index
          element={<Dashboard />}
          loader={async ({ request }) => await requireAuth(request)}
          errorElement={<Error />}
        />

        <Route
          path="income"
          element={<Income />}
          loader={async ({ request }) => await requireAuth(request)}
          errorElement={<Error />}
        />
        <Route
          path="reviews"
          element={<Reviews />}
          loader={async ({ request }) => await requireAuth(request)}
          errorElement={<Error />}
        />

        <Route
          path="vans"
          loader={hostVans}
          element={<HostVans />}
          errorElement={<Error />}
        />

        <Route
          path="vans/:id"
          loader={hostVanDetail}
          element={<HostVanDetail />}
          errorElement={<Error />}
        >
          <Route
            index
            element={<HostVanInfo />}
            loader={async ({ request }) => await requireAuth(request)}
            errorElement={<Error />}
          />

          <Route
            path="pricing"
            element={<HostVanPricing />}
            loader={async ({ request }) => await requireAuth(request)}
            errorElement={<Error />}
          />
          <Route
            path="photos"
            element={<HostVanPhotos />}
            loader={async ({ request }) => await requireAuth(request)}
            errorElement={<Error />}
          />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);

// ---------------------------------------------------------------------------------
function App() {
  return <RouterProvider router={router} />;
}

export default App;
