import { dictionaries, type Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import type { ServicePackage } from "@/lib/types";

export type PackageCopy = {
  title: string;
  duration: string;
  description: string;
  features: string[];
};

function matchPackageId(item: ServicePackage) {
  const byId = dictionaries.es.packageItems[item.id] || dictionaries.en.packageItems[item.id];
  if (byId) return item.id;

  const esItems = dictionaries.es.packageItems;
  const enItems = dictionaries.en.packageItems;
  return (
    Object.keys(esItems).find((id) => esItems[id].title === item.title) ||
    Object.keys(enItems).find((id) => enItems[id].title === item.title) ||
    Object.keys(esItems).find((id) => esItems[id].title === item.title_en) ||
    Object.keys(enItems).find((id) => enItems[id].title === item.title_en)
  );
}

export function localizedPackage(
  item: ServicePackage,
  locale: Locale,
  t: Dictionary,
): PackageCopy {
  const id = matchPackageId(item);
  const copy = id ? t.packageItems[id] : undefined;
  if (copy) return copy;

  if (locale === "en") {
    return {
      title: item.title_en || item.title,
      duration: item.duration_en || item.duration,
      description: item.description_en || item.description,
      features: item.features_en?.length ? item.features_en : item.features,
    };
  }

  return {
    title: item.title,
    duration: item.duration,
    description: item.description,
    features: item.features,
  };
}
