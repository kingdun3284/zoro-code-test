"use client";
import Button from "@/components/button";
import Input from "@/components/input";
import Modal from "@/components/modal";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons/faCircleNotch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
export default function Page() {
  const { push } = useRouter();
  const [errorModal, setErrorModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const formEl = e.target;
    if (formEl instanceof HTMLFormElement) {
      const valid = formEl.checkValidity();
      if (valid) {
        const formData = new FormData(formEl);
        const username = formData.get("username");
        const password = formData.get("password");
        setLoading(true);
        const res = await fetch("/api/login", {
          body: JSON.stringify({ username, password }),
          method: "POST",
        });
        if (res.status >= 400) {
          setErrorModal(true);
        }
        setLoading(false);
        if (res.status === 200) push("/dashboard");
      }
    }
  };
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row gap-20 items-center justify-center bg-gradient-to-b from-white  via-white via-80%  to-cyan-900">
      <Image
        src="logo.svg"
        alt="logo"
        width="200"
        height="0"
        className="h-auto"
      ></Image>

      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-2 w-80 max-w-full p-4"
      >
        <div className="flex flex-col">
          <label htmlFor="username">Username</label>
          <Input required id="username" name="username"></Input>
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <Input required id="password" name="password"></Input>
        </div>
        <Button className="mt-4 self-end" type="submit">
          Login
          {loading ? (
            <FontAwesomeIcon className="ml-4" icon={faCircleNotch} spin />
          ) : null}
        </Button>
      </form>
      <Modal show={errorModal} onClosed={() => setErrorModal(false)}>
        <div className="flex flex-col gap-2 px-4">
          <div className="font-bold text-2xl">Error</div>
          <div>Username or password is incorrect</div>
          <Button
            disabled={loading}
            className="self-end w-12"
            onClick={() => setErrorModal(false)}
          >
            OK
          </Button>
        </div>
      </Modal>
    </div>
  );
}
