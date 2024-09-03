import type { User } from "../adapters/schema";
import type { FieldAttribute } from "../db/field";
import type { Adapter } from "./adapter";
import type { BetterAuthPlugin } from "./plugins";
import type { OAuthProvider } from "./provider";

export interface BetterAuthOptions {
	/**
	 * Base URL for the better auth. This is typically the
	 * root URL where your
	 * application server is hosted. If not explicitly set,
	 * the system will check the following environment variable:
	 *
	 * process.env.BETTER_AUTH_URL
	 *
	 * If not set it will throw an error.
	 */
	baseURL?: string;
	/**
	 * The secret to use for encryption,
	 * signing and hashing.
	 *
	 * By default better auth will look for
	 * the following environment variables:
	 * process.env.BETTER_AUTH_SECRET,
	 * process.env.AUTH_SECRET
	 * If none of these environment
	 * variables are set,
	 * it will default to
	 * "better-auth-secret-123456789".
	 *
	 * on production if it's not set
	 * it will throw an error.
	 *
	 * you can generate a good secret
	 * using the following command:
	 * @example
	 * ```bash
	 * openssl rand -base64 32
	 * ```
	 */
	secret?: string;
	/**
	 * list of social providers
	 */
	socialProvider?: OAuthProvider[];
	/**
	 * Plugins
	 */
	plugins?: BetterAuthPlugin[];
	/**
	 * Advanced options
	 */
	advanced?: {
		/**
		 * Use secure cookies
		 *
		 * @default false
		 */
		useSecureCookies?: boolean;
		/**
		 * Disable CSRF check
		 */
		disableCSRFCheck?: boolean;
	};
	/**
	 * Disable logging
	 *
	 * @default false
	 */
	disableLog?: boolean;
	/**
	 * Database configuration
	 */
	database:
		| {
				provider: "postgres" | "sqlite" | "mysql";
				url: string;
		  }
		| Adapter;
	/**
	 * User configuration
	 */
	user?: {
		/**
		 * The model name for the user. Defaults to "user".
		 */
		modelName?: string;
		/**
		 * Additional fields to add to the user model
		 */
		additionalFields?: Record<string, FieldAttribute>;
	};
	session?: {
		modelName?: string;
		/**
		 * Expiration time for the session token. The value
		 * should be in seconds.
		 * @default 7 days (60 * 60 * 24 * 7)
		 */
		expiresIn?: number;
		/**
		 * How often the session should be refreshed. The value
		 * should be in seconds.
		 * If set 0 the session will be refreshed every time it is used.
		 * @default 1 day (60 * 60 * 24)
		 */
		updateAge?: number;
	};
	account?: {
		modelName?: string;
	};
	/**
	 * Email and password authentication
	 */
	emailAndPassword?: {
		/**
		 * Enable email and password authentication
		 *
		 * @default false
		 */
		enabled: boolean;
		/**
		 * The maximum length of the password.
		 *
		 * @default 8
		 */
		maxPasswordLength?: number;
		/**
		 * The minimum length of the password.
		 *
		 * @default 32
		 */
		minPasswordLength?: number;
		/**
		 * send reset password email
		 *
		 * @param token the token to send to the email. Make sure to include the token as a
		 * parameter in the URL. You'll need to send it back to reset the password.
		 * @param user the user to send the email to
		 */
		sendResetPasswordToken?: (token: string, user: User) => Promise<void>;
		/**
		 * @param email the email to send the verification email to
		 * @param url the url to send the verification email to
		 */
		sendVerificationEmail?: (email: string, url: string) => Promise<void>;
	};
	/**
	 * List of trusted origins.
	 */
	trustedOrigins?: string[];
}
