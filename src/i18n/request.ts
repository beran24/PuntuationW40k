import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value || 'en';
  const dashboard = (await import(`../messages/${locale}/dashboard.json`))
    .default;
  const primaryMissions = (
    await import(`../messages/${locale}/primaryMissions.json`)
  ).default;
  const missionRules = (await import(`../messages/${locale}/missionRules.json`))
    .default;

  return {
    locale,
    messages: {
      dashboard,
      primaryMissions,
      missionRules,
    },
  };
});
