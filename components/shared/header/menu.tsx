import { UserIcon } from "lucide-react";
import Link from "next/link";
import CartButton from "./cart-button";

export default function Menu() {
    return (
        <div className="flex justify-end">
            <nav className="flex gap-3 w-full">
                <Link href="/signin" className="header-button flex gap-2 items-center">
                    <UserIcon className="w-6 h-6" />
                    Sign in
                </Link>
                <CartButton />
            </nav>
        </div>
    )
}