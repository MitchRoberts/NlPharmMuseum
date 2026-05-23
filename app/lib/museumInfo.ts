import { getPostBySlug } from "@/app/lib/wp";
import { asString, asStringArray, extractJsonFromWpHtml } from "@/app/lib/wpjson";

export type MuseumInfo = {
  planTitle: string;
  planSubtitle: string;
  planDetailsLabel: string;
  seasonalLabel: string;
  seasonalText: string;
  hoursLabel: string;
  hoursText: string;
  locationTitle: string;
  museumName: string;
  addressLines: string[];
  visitInfoLabel: string;
  directionsLabel: string;
  directionsUrl: string;
  mapTitle: string;
  mapEmbedUrl: string;
  footerVisitTitle: string;
  footerHoursTitle: string;
  footerGroupTitle: string;
  footerGroupText: string;
  footerCharityText: string;
  email: string;
};

type JsonRecord = Record<string, unknown>;

const fallbackMuseumInfo: MuseumInfo = {
  planTitle: "Plan Your Visit",
  planSubtitle: "Hours, location, and directions-everything you need in one place.",
  planDetailsLabel: "View details",
  seasonalLabel: "Seasonal",
  seasonalText: "May 15 - September 6",
  hoursLabel: "Hours",
  hoursText: "Tue - Sun - 10:00am - 5:00pm",
  locationTitle: "Location",
  museumName: "Newfoundland and Labrador Pharmacy Museum",
  addressLines: ["Apothecary Hall, 488 Water St.", "St. John's, NL A1E 1B3"],
  visitInfoLabel: "Visit Info",
  directionsLabel: "Get Directions",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Newfoundland+%26+Labrador+Pharmacy+Museum,+488+Water+St,+St.+John%27s,+NL+A1E+1B3",
  mapTitle: "Map",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5385.212706394297!2d-52.713152699999995!3d47.5559897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4b0ca3af5599226d%3A0x522d1adbf95caa2f!2sNewfoundland%20%26%20Labrador%20Pharmacy%20Museum!5e0!3m2!1sen!2sca!4v1772129805273!5m2!1sen!2sca",
  footerVisitTitle: "Visiting the Museum",
  footerHoursTitle: "Opening Hours",
  footerGroupTitle: "Group Visits",
  footerGroupText: "Please email us for arranging group visits or special requests.",
  footerCharityText: "Registered Charity CRA No. 768787301RR0001",
  email: "hello@nlpharmacymuseum.ca",
};

function isRecord(value: unknown): value is JsonRecord {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function firstString(obj: JsonRecord, keys: string[], fallback: string) {
  for (const key of keys) {
    const value = asString(obj[key]);
    if (value) return value;
  }
  return fallback;
}

function firstStringArray(
  obj: JsonRecord,
  keys: string[],
  fallback: string[]
) {
  for (const key of keys) {
    const value = asStringArray(obj[key]);
    if (value?.length) return value;
  }
  return fallback;
}

function buildMuseumInfo(renderedHtml: string): MuseumInfo | null {
  const obj = extractJsonFromWpHtml(renderedHtml) as unknown;
  if (!isRecord(obj)) return null;

  return {
    planTitle: firstString(obj, ["planTitle"], fallbackMuseumInfo.planTitle),
    planSubtitle: firstString(
      obj,
      ["planSubtitle"],
      fallbackMuseumInfo.planSubtitle
    ),
    planDetailsLabel: firstString(
      obj,
      ["planDetailsLabel"],
      fallbackMuseumInfo.planDetailsLabel
    ),
    seasonalLabel: firstString(
      obj,
      ["seasonalLabel"],
      fallbackMuseumInfo.seasonalLabel
    ),
    seasonalText: firstString(
      obj,
      ["seasonalText", "seasonal"],
      fallbackMuseumInfo.seasonalText
    ),
    hoursLabel: firstString(obj, ["hoursLabel"], fallbackMuseumInfo.hoursLabel),
    hoursText: firstString(
      obj,
      ["hoursText", "hours"],
      fallbackMuseumInfo.hoursText
    ),
    locationTitle: firstString(
      obj,
      ["locationTitle"],
      fallbackMuseumInfo.locationTitle
    ),
    museumName: firstString(
      obj,
      ["museumName"],
      fallbackMuseumInfo.museumName
    ),
    addressLines: firstStringArray(
      obj,
      ["addressLines", "address"],
      fallbackMuseumInfo.addressLines
    ),
    visitInfoLabel: firstString(
      obj,
      ["visitInfoLabel"],
      fallbackMuseumInfo.visitInfoLabel
    ),
    directionsLabel: firstString(
      obj,
      ["directionsLabel"],
      fallbackMuseumInfo.directionsLabel
    ),
    directionsUrl: firstString(
      obj,
      ["directionsUrl"],
      fallbackMuseumInfo.directionsUrl
    ),
    mapTitle: firstString(obj, ["mapTitle"], fallbackMuseumInfo.mapTitle),
    mapEmbedUrl: firstString(
      obj,
      ["mapEmbedUrl"],
      fallbackMuseumInfo.mapEmbedUrl
    ),
    footerVisitTitle: firstString(
      obj,
      ["footerVisitTitle"],
      fallbackMuseumInfo.footerVisitTitle
    ),
    footerHoursTitle: firstString(
      obj,
      ["footerHoursTitle"],
      fallbackMuseumInfo.footerHoursTitle
    ),
    footerGroupTitle: firstString(
      obj,
      ["footerGroupTitle"],
      fallbackMuseumInfo.footerGroupTitle
    ),
    footerGroupText: firstString(
      obj,
      ["footerGroupText"],
      fallbackMuseumInfo.footerGroupText
    ),
    footerCharityText: firstString(
      obj,
      ["footerCharityText"],
      fallbackMuseumInfo.footerCharityText
    ),
    email: firstString(obj, ["email"], fallbackMuseumInfo.email),
  };
}

export async function getMuseumInfo() {
  const post = await getPostBySlug("museum-info").catch(() => null);
  if (!post) return fallbackMuseumInfo;

  const contentHtml = post.content?.rendered?.trim() || "";
  const excerptHtml = post.excerpt?.rendered?.trim() || "";

  return (
    buildMuseumInfo(contentHtml) ??
    buildMuseumInfo(excerptHtml) ??
    fallbackMuseumInfo
  );
}
