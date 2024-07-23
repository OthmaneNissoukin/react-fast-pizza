import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";
import { useSelector } from "react-redux";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  const isFullCart = useSelector(state=>state.cart.length)

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}
      <Header />

      <main className="overflow-y-auto">
        <div className="m-auto max-w-xl">
          <Outlet />
        </div>
      </main>
      {isFullCart > 0 && <CartOverview />}
      
    </div>
  );
}

export default AppLayout;
