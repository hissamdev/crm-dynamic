import SignInTemplate from "@/emails/SignInTemplate";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import z from "zod";

const schema = z.object({
    email: z.email(),
    url: z.string(),
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
    const body = await req.json();
    const safeBody = schema.safeParse(body);
    if (!safeBody.success) {
        return NextResponse.json(
            {
                success: false,
                message: "Validation failed",
                error: safeBody.error.issues,
            },
            { status: 400 },
        );
    }

    try {
        const { data, error } = await resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: ["delivered@resend.dev"],
            subject: "Sign In Request",
            react: SignInTemplate({
                email: safeBody.data.email,
                url: safeBody.data.url,
            }),
        });

        if (error) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Failed to send email from API",
                    error,
                },
                { status: 500 },
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong",
                error,
                data: {
                    email: safeBody.data.email,
                    url: safeBody.data.url,
                },
            },
            { status: 500 },
        );
    }
}
