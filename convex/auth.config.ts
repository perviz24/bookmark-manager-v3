// Convex auth configuration for Clerk integration
// CRITICAL: Deploy to BOTH dev AND prod — they are separate deployments
//   Dev:  npx convex dev --once
//   Prod: npx convex deploy
// CRITICAL: JWT template in Clerk must be named exactly "convex"

export default {
  providers: [
    {
      // Must match your Clerk issuer URL exactly
      // Find at: Clerk dashboard → JWT Templates → "convex" → Issuer URL
      domain: "https://YOUR-CLERK-DOMAIN.clerk.accounts.dev",
      // Must match JWT template name in Clerk dashboard
      applicationID: "convex",
    },
  ],
}
