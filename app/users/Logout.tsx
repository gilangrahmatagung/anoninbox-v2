"use client";
import { baseUrl } from "@/app/schemas/schema";
import Button from "@/components/ui/Button";

export default function Logout() {
  async function logoutSubmit() {
    try {
      const response = await fetch(`${baseUrl}/users/logout/`, {
        method: "GET",
        credentials: "include",
      });
      await response.json();

      if (response.ok) {
        window.location.href = "/users/login";
        return;
      }
    } catch (error) {
      // fallthrough to redirect
    }
    window.location.href = "/users/login";
  }

  return (
    <Button type="button" variant="ghost" onClick={logoutSubmit}>
      Logout
    </Button>
  );
}