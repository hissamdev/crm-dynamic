interface EmailTemplateProps {
    firstName: string;
}

export function SignInTemplate({ firstName }: EmailTemplateProps) {
    return (
        <div>
            <h1>Welcome {firstName}</h1>
        </div>
    );
}
