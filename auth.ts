import NextAuth from "next-auth"

import Patreon from "next-auth/providers/patreon"

import type { NextAuthConfig } from "next-auth"

export const config = {
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  },
  providers: [
    Patreon({profile:profile => {
      const getRelationship = (relationship) => profile["included"][0]["relationships"][relationship]["links"]["related"]
      let creator = getRelationship("creator")
      let patron = getRelationship("patron")
      let reward = getRelationship("reward")
      {
        "id": profile["data"]["id"],
        "name": profile["data"]["attributes"]["full_name"],
        "email": profile["data"]["attributes"]["email"],
        "image": profile["data"]["attributes"]["image_url"],
        "creator_id": creator,
        "patron_id": patron,
        "reward_id": reward,
      }
    }}),
  ],
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)
