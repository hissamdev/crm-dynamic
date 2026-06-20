export async function GET({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
}
