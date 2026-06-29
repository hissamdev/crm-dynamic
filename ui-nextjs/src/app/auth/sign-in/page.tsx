import { actionLinkSignIn } from "../../actions/server";

export default function SignIn() {
    return (
        <main className="h-screen bg-black font-inter text-white">
            <form
                action={actionLinkSignIn}
                className="mt-50 mx-auto max-w-100 py-10 px-8 min-h-90 border border-gray-500 rounded-2xl"
            >
                <fieldset>
                    <label htmlFor="email" className="text-lg">
                        Enter your email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="email"
                        placeholder="e.g. your-email@provider.com"
                        className="mt-2 px-3 py-2 w-full border border-gray-700 rounded-md text-sm"
                    />
                    <p className="mt-2 text-sm font-light leading-tight">
                        An email containin a link will be sent to your inbox
                    </p>
                </fieldset>

                <fieldset className="mt-10 flex items-start gap-4">
                    <input
                        type="checkbox"
                        id="checkbox"
                        name="terms"
                        value="yes"
                        className="
                            mt-1
                            cursor-pointer
                        "
                    />
                    <label htmlFor="checkbox" className="text-sm">
                        I acknowledge that this project is a work in progress
                        and is being displayed for demonstration purposes.
                    </label>
                </fieldset>

                <button
                    type="submit"
                    className="block mx-auto mt-12 px-4 py-1.5 bg-white hover:bg-white/80 text-black cursor-pointer rounded-md"
                >
                    Submit
                </button>
            </form>
        </main>
    );
}
