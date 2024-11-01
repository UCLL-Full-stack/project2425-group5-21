import React from "react";
import Link from "next/link";

const Header: React.FC = () => {
    return (
        <header className="p-4 bg-custom-blue-gray border-b border-gray-700">
            <div className="container mx-auto flex items-center w-full">
                <a className="text-2xl font-semibold text-white-50 -ml-4" href="#">
                    MR Typer
                </a>

                <nav className="flex space-x-6 ml-auto">
                    <Link href="/" className="nav-link text-lg text-white hover:text-yellow-400">
                        Home
                    </Link>
                    <Link href="/leaderboards" className="nav-link text-lg text-white hover:text-yellow-400">
                        Leaderboard
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
