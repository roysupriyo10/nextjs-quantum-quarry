import Image from "next/image"
import Link from "next/link"
import logo from '@/assets/logo.png'
import { redirect } from "next/navigation";
import { getCart } from "@/lib/db/cart";
import { ShoppingCartButton } from "..";
import UserMenuButton from "./UserMenuButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const searchProducts = async (formData: FormData) => {
  'use server';

  const searchQuery = formData.get("search-query")?.toString();

  if (searchQuery) {
    redirect("/search?query=" + searchQuery);
  }
}

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  const cart = await getCart();

  return (
    <nav className="bg-base-100">
      <div className="px-4 navbar max-w-7xl m-auto flex-col sm:flex-row gap-2">
        <div className="flex-1">
          <Link
            href="/"
            className="btn btn-ghost text-xl normal-case"
          >
            <Image
              src={logo}
              height={40}
              width={40}
              alt="Quantum Quarry logo"
            />
            Quantum Quarry
          </Link>
        </div>
        <div className="flex-none gap-2">
          <form action={searchProducts}>
            <div className="form-control">
              <input
                type="text"
                name="search-query"
                placeholder="Search"
                className="input input-bordered w-full min-w-[80px]"
              />
            </div>
          </form>
          <ShoppingCartButton cart={cart} />
          <UserMenuButton session={session} />
          
        </div>
      </div>
    </nav>
  )
}

export default Navbar
