import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function SignIn() {
    return (
        <main className="h-screen bg-black">
            <div className="mx-auto mt-40 w-fit">
                <form action="">
                    <FieldGroup className="p-5 min-w-120 min-h-100 border border-gray-500 rounded-md">
                        <Field>
                            <FieldLabel htmlFor="email" className="text-white">
                                Enter your email
                            </FieldLabel>
                            <Input
                                id="email"
                                placeholder="e.g. your-email@provider.com"
                                className="text-white py-4"
                            />
                            <FieldDescription className="block mt-2 font-semibold leading-tight">
                                This action will send you an email with an OTP
                                code used to sign in
                            </FieldDescription>
                        </Field>
                        <Field>
                            <div>
                                <button className="block px-8 py-1.5 bg-white rounded-md cursor-pointer">
                                    Submit
                                </button>
                            </div>
                        </Field>
                    </FieldGroup>
                </form>
            </div>
        </main>
    );
}
