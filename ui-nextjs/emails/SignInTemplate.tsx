import {
    Button,
    CodeBlock,
    CodeInline,
    Container,
    Heading,
    Hr,
    Html,
    Link,
    Tailwind,
    Text,
} from "react-email";

interface EmailTemplateProps {
    email: string;
    url: string;
}

export default function SignInTemplate({ email, url }: EmailTemplateProps) {
    return (
        <Html lang="en" className="border">
            <Tailwind>
                <Container className="px-4">
                    <Heading>Sign In</Heading>
                    <Hr />
                    <Text>
                        Hello,
                        <br />
                        <br />
                        We received a request to sign in. If this wasn't you,
                        you can safely ignore this email.
                        <br />
                        <br />
                        Click the link below or open it in your browser to sign
                        in.
                    </Text>
                    <CodeInline className="bg-black px-2 py-1 rounded-sm">
                        <Link href={url}>https://some-link.com</Link>
                    </CodeInline>
                </Container>
            </Tailwind>
        </Html>
    );
}
