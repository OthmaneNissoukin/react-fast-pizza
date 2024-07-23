import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const menuData = useLoaderData();

  

  return (
    <ul className="divide-y-2 divide-stone-300">
      {menuData.map((pizza) => (
        <MenuItem key={pizza.id} pizza={pizza} />
      ))}
    </ul>
  );
}

async function loader() {
  const menu = await getMenu();
  return menu;
}

export { loader };
export default Menu;
