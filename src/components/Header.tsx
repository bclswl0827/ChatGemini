import menuIcon from "../assets/icons/bars-staggered-solid.svg";
import newChatIcon from "../assets/icons/square-plus-regular.svg";
import purgeIcon from "../assets/icons/broom-ball-solid.svg";
import LogoutIcon from "../assets/icons/right-from-bracket-solid.svg";
import { Link } from "react-router-dom";

interface HeaderProps {
    readonly title?: string;
    readonly newChatUrl: string;
    readonly logoutIcon: boolean;
    readonly onLogout: () => void;
    readonly onToggleSidebar: () => void;
    readonly onPurgeSessions: () => void;
}

export const Header = (props: HeaderProps) => {
    const {
        title,
        newChatUrl,
        logoutIcon,
        onLogout,
        onToggleSidebar,
        onPurgeSessions,
    } = props;
    return (
        <header className="z-10 sticky top-0 flex px-2 py-3 items-center justify-between border-b bg-white">
            <button
                className="hover:bg-gray-200 rounded-lg p-2"
                onClick={onToggleSidebar}
            >
                <img src={menuIcon} className="size-4" alt="" />
            </button>
            {title && <h1 className="font-semibold text-lg">{title}</h1>}
            <div className="flex">
                <Link
                    className="hover:bg-gray-200 rounded-lg p-2"
                    to={newChatUrl}
                >
                    <img src={newChatIcon} className="size-4" alt="" />
                </Link>
                <button
                    className="hover:bg-gray-200 rounded-lg p-2"
                    onClick={onPurgeSessions}
                >
                    <img src={purgeIcon} className="size-4" alt="" />
                </button>
                {logoutIcon && (
                    <button
                        className="hover:bg-gray-200 rounded-lg p-2"
                        onClick={onLogout}
                    >
                        <img src={LogoutIcon} className="size-4" alt="" />
                    </button>
                )}
            </div>
        </header>
    );
};
