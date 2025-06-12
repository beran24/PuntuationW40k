import { MissionsPoints } from '@/types/Missions';

export default function getTotalPoints(missionPoints: MissionsPoints): number {
  return missionPoints.reduce(
    (acc, m) => {
      // Cálculo de P limitado
      const remainingP = 50 - acc.pSum;
      const pToAdd = Math.min(m.P, remainingP);
      // Cálculo de A + B limitado
      const remainingAB = 40 - acc.abSum;
      const aToAdd = Math.min(m.A, remainingAB);
      const bToAdd = Math.min(m.B, Math.max(0, remainingAB - aToAdd));

      return {
        sum: acc.sum + pToAdd + aToAdd + bToAdd,
        pSum: acc.pSum + pToAdd,
        abSum: acc.abSum + aToAdd + bToAdd,
      };
    },
    { sum: 0, pSum: 0, abSum: 0 }
  ).sum;
}
