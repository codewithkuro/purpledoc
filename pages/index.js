"use client";
import React, { useContext, useMemo, useState } from "react";
import { AppDashboard } from "../components/AppDashboard";
import Providers from "../components/Providers";

export default function Dashboard() {
  return (
    <Providers>
      <AppDashboard />
    </Providers>
  );
}
