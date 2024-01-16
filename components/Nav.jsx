"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession, signIn, signOut, getProviders } from "next-auth/react";

const Nav = () => {
  
  const { data: session } = useSession()
  // The reason for using useSession() to access session data is to provide a faster and more efficient way to check a user's authentication status and access basic user information without repeatedly querying the database

  const [providers, setProviders] = useState(null);
  const [toggleDropDown , setToggleDropDown] = useState(false)

  useEffect(() => {
    const getusers = async () => {
      const res = await getProviders();
      //The NextAuth.js server processes this request and gathers information about the authentication providers you have configured in your NextAuth.js configuration. This information may include details about providers such as Google, Facebook, custom OAuth providers, or any other authentication methods you've set up.

      setProviders(res);
    };

    getusers();
  }, []);


  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex flex-center gap-2">
        <Image
          src="/assets/images/logo.svg"
          alt="promptopia Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop nav */}

      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>

            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>

            <Link href='/profile'>
            <Image
              src={session?.user.image}
              alt="promptopia Logo"
              width={37}
              height={37}
              className="rounded-full"
              onClick={() => setToggleDropDown( prev => !prev ) }
            />
            </Link>
          </div>
        ) : (
          <div>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </div>
        )}
      </div>

      {/* Mobile Nav */}
      <section className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              alt="promptopia Logo"
              width={37}
              height={37}
              className="rounded-full"
              onClick={() => setToggleDropDown( prev => !prev ) }
            />
            {
              toggleDropDown && <div className="dropdown" >
                <Link href='/profile'className="dropdown_link" onClick={()=> setToggleDropDown(false) } >
                  My Profile
                </Link>
                <Link href='/create-prompt'className="dropdown_link" onClick={()=> setToggleDropDown(false) } >
                  Create Prompt
                </Link>
                <button type="button" onClick={() => {
                  setToggleDropDown(false)
                  signOut()
                }} 
                className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            }
          </div>
        ) : (
          <div>
          {providers &&
            Object.values(providers)?.map((provider) => (
              <button
                type="button"
                key={provider.name}
                onClick={() => signIn(provider.id)}
                // The signIn function expects the provider.id to be a string that matches the identifier of a configured authentication provider. This identifier should correspond to the authentication provider you've set up in your NextAuth.js configuration. When you pass "google" as the provider identifier, NextAuth.js knows to use the Google provider you've configured to handle the authentication flow with Google.
                className="black_btn"
              >
                Sign In
              </button>
            ))}
        </div>
        )}
      </section>
    </nav>
  );
};

export default Nav;
