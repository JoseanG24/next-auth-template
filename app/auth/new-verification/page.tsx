"use client";

import { useSearchParams } from "next/navigation";
import React from "react";
import { useCallback, useEffect } from "react";
import { BeatLoader } from "react-spinners";
import { newVerification } from "@/actions/new-verification";
import { useState } from "react";

const NewVerificationPage = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Missing Token!  ");
      return;
    }
    newVerification(token)
      .then((data) => {
        setSuccess(data.succes);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong");
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-center text-white p-4">
      {!success && !error && (
        <div className="flex items-center justify-center">
          <BeatLoader color="white" />
        </div>
      )}

      {success && (
        <div className="bg-green-600 p-4 rounded-lg mt-4">
          <h2 className="text-2xl font-semibold">
            Email Verified Successfully!
          </h2>
          <p className="mt-2">You can now proceed to login.</p>
        </div>
      )}

      {error && (
        <div className="bg-red-600 p-4 rounded-lg mt-4">
          <h2 className="text-2xl font-semibold">Verification Error</h2>
          <p className="mt-2">{error}</p>
        </div>
      )}
    </div>
  );
};

export default NewVerificationPage;
