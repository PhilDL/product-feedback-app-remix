import React from "react";
import { Link, Form, ActionFunction } from "remix";
import { User } from "@prisma/client";
import { auth } from "~/auth.server";

export interface Props {
  user: User;
}

const Footer: React.FC<Props> = ({ user }) => {
  return (
    <footer className="w-full py-7 px-6 text-center items-center justify-center md:px-0">
      {user ? (
        <>
          Logged-in as{" "}
          <span className="text-gray-500 ml-1">{user.username}</span>
          <Form method="post" action="/api/logout">
            <button className="cursor-pointer text-fushia hover:text-fushia-light ml-1">
              Click here to log-out
            </button>
          </Form>
        </>
      ) : (
        <>
          You will need to{" "}
          <Link
            to="login"
            className="cursor-pointer text-fushia hover:text-fushia-light mx-1"
          >
            Log-In
          </Link>{" "}
          or{" "}
          <Link
            to="register"
            className="cursor-pointer text-fushia hover:text-fushia-light mx-1"
          >
            Sign-Up
          </Link>{" "}
          to submit feedback and comment.
        </>
      )}
    </footer>
  );
};

export default Footer;
