import { Checkbox } from "@/components/ui/checkbox";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function SignIn() {
    return (
        <main className="h-screen bg-black font-inter">
            <div className="mx-auto mt-40 w-fit">
                <form>
                    <FieldGroup className="py-14 px-10 min-w-143.75 min-h-100 border border-gray-500 rounded-2xl">
                        <Field>
                            <FieldLabel
                                htmlFor="email"
                                className="text-xl font-semibold text-white"
                            >
                                Enter your email
                            </FieldLabel>
                            <Input
                                id="email"
                                placeholder="e.g. your-email@provider.com"
                                className="text-white py-5 border-gray-400"
                            />
                            <FieldDescription className="mt-2 block text-white text-lg font-light">
                                Type in your email to receive a code for signing
                                in
                            </FieldDescription>
                        </Field>
                        <Field className="">
                            <div className="flex items-center gap-4">
                                <Checkbox id="terms" />
                                <FieldLabel
                                    htmlFor="terms"
                                    className="text-white"
                                >
                                    I acknowledge that this application is a
                                    work in progress
                                </FieldLabel>
                            </div>
                        </Field>
                        <Field className="mt-12">
                            <div>
                                <button className="block mx-auto px-8 py-1.5 bg-white rounded-md cursor-pointer">
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
