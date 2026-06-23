import { z } from "zod";

const optionalUrl = z
  .string()
  .trim()
  .optional()
  .transform((value) => (value ? value : undefined))
  .refine((value) => !value || /^(https?:\/\/|[a-z][a-z0-9+.-]*:\/\/)/i.test(value), {
    message: "Use a valid URL or app URI scheme."
  });

const optionalStr = (max = 200) =>
  z.string().trim().max(max).optional()
    .transform((v) => (v ? v : undefined));

export const createLinkSchema = z
  .object({
    destinationUrl: optionalUrl,
    title: z
      .string()
      .trim()
      .min(2, "Add a title with at least 2 characters.")
      .max(80)
      .optional()
      .transform((value) => (value ? value : undefined)),
    preset: z
      .enum(["custom", "instagram", "facebook", "whatsapp", "telegram", "tiktok", "youtube", "twitter", "google-maps"])
      .optional(),
    slug: z
      .string()
      .trim()
      .max(50)
      .optional()
      .transform((value) => (value ? value : undefined)),
    iosDeepLink:      optionalUrl,
    iosStoreUrl:      optionalUrl,
    androidDeepLink:  optionalUrl,
    androidStoreUrl:  optionalUrl,
    desktopUrl:       optionalUrl,
    campaign:         optionalStr(80),
    /* UTM parameters */
    utmSource:        optionalStr(100),
    utmMedium:        optionalStr(100),
    utmCampaign:      optionalStr(100),
    utmTerm:          optionalStr(100),
    utmContent:       optionalStr(100),
  })
  .superRefine((value, ctx) => {
    if (!value.destinationUrl && !value.iosDeepLink && !value.androidDeepLink && !value.desktopUrl) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Add a destination link first.",
        path: ["destinationUrl"]
      });
    }
  });

