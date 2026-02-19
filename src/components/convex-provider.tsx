"use client"

import { ClerkProvider, useAuth } from "@clerk/nextjs"
import { ConvexProviderWithClerk } from "convex/react-clerk"
import { ConvexReactClient } from "convex/react"

// SESSION NOTE: When Convex/Clerk env vars are missing, skip providers
// and render children directly. Remove this guard after setup.
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL
const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

const convex = convexUrl ? new ConvexReactClient(convexUrl) : null

export function ConvexClientProvider({
  children,
}: {
  children: React.ReactNode
}) {
  if (!convex || !clerkKey) {
    return <>{children}</>
  }

  return (
    <ClerkProvider publishableKey={clerkKey}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  )
}
