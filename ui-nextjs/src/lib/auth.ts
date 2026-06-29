import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { magicLink } from "better-auth/plugins";
import prisma from "./prisma";
import axios from "axios";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
    },
    plugins: [
        magicLink({
            sendMagicLink: async ({ email, token, url, metadata }, ctx) => {
                // send email to user
                try {
                    const res = await axios.post(
                        `${process.env.API_URL}/api/send`,
                        {
                            email,
                        },
                    );
                    if (!res.data.success) {
                        throw new Error("Failed to send sign in email");
                    }
                } catch (err) {
                    console.error(err);
                    throw new Error("Fetch failed: Post request to /api/send");
                }
            },
        }),
    ],
});
