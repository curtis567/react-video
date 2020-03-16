import { Home, Favorite } from "./pages/pages";
export const rootPath = process.env.PUBLIC_URL;

const routes = [
  {
    path: `${rootPath}/`,
    component: Home,
    exact: true,
    breadcrumbName: "Home"
  },
  {
    path: `${rootPath}/Favorite`,
    component: Favorite,
    breadcrumbName: "Favorite"
  }
];

export default routes;
