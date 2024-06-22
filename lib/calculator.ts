type Plan = "arcade" | "advanced" | "pro";
type Addon = "online-service" | "larger-storage" | "customizable-profile";

interface Prices {
  monthly: number;
  annual: number;
}

interface AddonInfo {
  cleanName: string;
  price: string;
}

const plans: Record<Plan, Prices> = {
  arcade: { monthly: 9, annual: 90 },
  advanced: { monthly: 12, annual: 120 },
  pro: { monthly: 15, annual: 150 },
};

const addons: Record<Addon, Prices> = {
  "online-service": { monthly: 1, annual: 10 },
  "larger-storage": { monthly: 2, annual: 20 },
  "customizable-profile": { monthly: 2, annual: 20 },
};

const planPrice = (plan: Plan, isYearly: boolean): number => {
  const prices = plans[plan];
  return isYearly ? prices.annual : prices.monthly;
};

const getCleanAddonName = (addon: Addon): string => {
  return addon
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const getAddonPrice = (addon: Addon, isYearly: boolean): number => {
  const prices = addons[addon];
  return isYearly ? prices.annual : prices.monthly;
};

const calculateTotalAddonPrice = (
  selectedAddons: Addon[],
  isYearly: boolean
): number => {
  return selectedAddons.reduce((total, addon) => {
    return total + getAddonPrice(addon, isYearly);
  }, 0);
};

const addTagYearlyMonthly = (price: number, isYearly: boolean) => {
  return `$${price}${isYearly ? "/yr" : "/mo"}`;
};

const getAddonsInfo = (
  selectedAddons: Addon[],
  isYearly: boolean
): AddonInfo[] => {
  return selectedAddons.map((addon) => ({
    cleanName: getCleanAddonName(addon),
    price: addTagYearlyMonthly(getAddonPrice(addon, isYearly), isYearly),
  }));
};

export function calculator(
  addons:
    | ("online-service" | "larger-storage" | "customizable-profile")[]
    | undefined,
  plan: "arcade" | "advanced" | "pro",
  isYearly: boolean
) {
  let fullPrice = 0;
  const planFull =
    plan[0].toUpperCase() +
    plan.slice(1) +
    ` ${isYearly ? "(Yearly)" : "(Monthly)"}`;

  const selectedPlanPrice = planPrice(plan, isYearly);

  const addonsArray = getAddonsInfo(addons ? addons : [], isYearly);

  fullPrice =
    fullPrice +
    selectedPlanPrice +
    calculateTotalAddonPrice(addons ? addons : [], isYearly);

  return {
    planFull,
    planPrice: addTagYearlyMonthly(selectedPlanPrice, isYearly),
    fullPrice: addTagYearlyMonthly(fullPrice, isYearly),
    addonsArray,
  };
}
