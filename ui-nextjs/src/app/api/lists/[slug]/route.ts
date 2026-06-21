import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> },
) {
    const { slug } = await params;
    console.log("Fetch received", slug);
    return NextResponse.json(
        {
            success: true,
            message: "Lists fetch received",
            data: slug,
        },
        { status: 200 },
    );
}
