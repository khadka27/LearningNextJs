import React from "react";

export default function ProfilePage({ params }: any) {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">Profile Page</h1>
      <hr className="mb-4" />
      <h2 className="text-2xl">{params.id}</h2>
    </div>
  );
}
