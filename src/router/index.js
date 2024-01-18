import Home from "../pages/home/home";
import {Navigate, Route} from "react-router-dom";
import Article from "../pages/News_page/Article";
import Login from "../pages/login/login";
import Registration from "../pages/registration/registration";
import CodeConfirmation from "../pages/registration/codeConfirmation";
import AccPage from "../pages/account_page/acc_page";
import AdminPage from "../pages/admin_page/AdminPage";
import UserPageFromAdmin from "../pages/admin_page/user_page_from_admin/UserPageFromAdmin";
import AllUsersPage from "../pages/admin_page/all_users_page/AllUsersPage";
import AllCommentsPage from "../pages/admin_page/all_comments_page/AllCommentsPage";



export const publicRoutes = [
    {path: "/home", element: Home, exact: true},
    {path: "/news/:post_id", element: Article, exact: true},
    {path: "/login", element: Login, exact: true},
    {path: "/registration", element: Registration, exact: true},
    {path: "/confirmation_code", element: CodeConfirmation, exact: true},
]

export const privateRoutes = [
    {path: "/account", element: AccPage, exact: true},
    {path: "/admin", element: AdminPage, exact: true},
    {path: "/admin/user_page", element: UserPageFromAdmin, exact: true},
    {path: "/admin/all_users_page", element: AllUsersPage, exact: true},
    {path: "/admin/all_comments_page", element: AllCommentsPage, exact: true}
]