import { SignInTemplate } from "@/src/components/emails/signin-template";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import z from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
    const body = await req.json();
    const safeEmail = z.email().safeParse(body.email);
    if (!safeEmail.success) {
        return NextResponse.json(
            {
                success: false,
                message: "Validation failed",
                error: safeEmail.error.issues,
            },
            { status: 400 },
        );
    }

    try {
        const { data, error } = await resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: ["delivered@resend.dev"],
            subject: "Hello world",
            react: SignInTemplate({ firstName: "Name" }),
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
            { success: false, message: "Something went wrong", error },
            { status: 500 },
        );
    }
}
