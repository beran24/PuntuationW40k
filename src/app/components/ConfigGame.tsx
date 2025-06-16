'use client';

import { useCallback } from 'react';
import { deploymentIds, deploymentImages } from '../constants/deployments';
import { battleSizeIds } from '../constants/battleSize';
import { missionRules } from '../constants/missionRules';
import { primaryMissionIds } from '../constants/primaryMissions';
import Selector from './common/Selector';
import Dice from './common/Dice';
import { useGame } from '@/providers/GameContext';
import { getRandomNumber } from '../constants/randomNumber';
import {
  terrainLayoutIds,
  terrainLayoutImages,
} from '../constants/terrainLayouts';
import MissionCard from './common/MissionCard';
import { useTranslations } from 'next-intl';

export default function ConfigGame() {
  const { game, changeGameConfig } = useGame();
  const pmt = useTranslations('primaryMissions');
  const mrt = useTranslations('missionRules');
  const dt = useTranslations('deployments');
  const cgt = useTranslations('configGame');

  const onHandleClickDice = useCallback(() => {
    changeGameConfig(
      'deployment',
      deploymentIds[getRandomNumber(0, deploymentIds.length - 1)]
    );
    changeGameConfig(
      'primaryMission',
      primaryMissionIds[getRandomNumber(0, primaryMissionIds.length - 1)]
    );
    changeGameConfig(
      'missionRule',
      missionRules[getRandomNumber(0, missionRules.length - 1)]
    );
    changeGameConfig(
      'terrainLayout',
      terrainLayoutIds[getRandomNumber(0, terrainLayoutIds.length - 1)]
    );
  }, [changeGameConfig]);

  return (
    <main className="flex flex-1 w-full header justify-center text-white overflow-y-auto mt-16 mb-16 min-h-[calc(100vh-4rem-4rem)]">
      <div className="flex flex-1 flex-col justify-center px-8">
        <div className="flex flex-row gap-8">
          <div className="w-1/2">
            {game.primaryMission && (
              <MissionCard
                type="Primary Mission"
                title={pmt(`${game.primaryMission}.name`)}
                subtitle={pmt(`${game.primaryMission}.history`)}
                section={pmt(`${game.primaryMission}.ruleDescription`)}
              />
            )}
          </div>
          <div className="w-1/2 ">
            {game.missionRule && (
              <MissionCard
                type="Mission rule"
                title={mrt(`${game.missionRule}.name`)}
                subtitle={mrt(`${game.missionRule}.history`)}
                section={mrt(`${game.missionRule}.ruleDescription`)}
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex-shrink-0 flex-col flex gap-1">
        <div className="flex justify-center">
          <Dice onHandleClickDice={onHandleClickDice} />
        </div>
        <Selector
          label={cgt('select-bs')}
          options={battleSizeIds.map((bs) => ({
            id: bs,
            name: cgt(`${bs}`),
          }))}
          value={game.battleSize}
          onHandleChange={(value) =>
            changeGameConfig('battleSize', value as string)
          }
        />
        <Selector
          label={cgt('select-d')}
          options={deploymentIds.map((d) => ({
            id: d,
            name: dt(`${d}.name`),
          }))}
          value={game.deployment || deploymentIds[0]}
          onHandleChange={(value) =>
            changeGameConfig('deployment', value as string)
          }
        />
        <Selector
          label={cgt('select-mr')}
          options={missionRules.map((mr) => ({
            id: mr,
            name: mrt(`${mr}.name`),
          }))}
          value={game.missionRule || missionRules[0]}
          onHandleChange={(value) =>
            changeGameConfig('missionRule', value as string)
          }
        />
        <Selector
          label={cgt('select-pm')}
          options={primaryMissionIds.map((pm) => ({
            id: pm,
            name: pmt(`${pm}.name`),
          }))}
          value={game.primaryMission || primaryMissionIds[0]}
          onHandleChange={(value) =>
            changeGameConfig('primaryMission', value as string)
          }
        />
        <Selector
          label={cgt('select-tl')}
          options={terrainLayoutIds.map((tl) => ({
            id: tl,
            name: cgt('terrain-layout') + ' ' + tl,
          }))}
          value={game.terrainLayout || terrainLayoutIds[0]}
          onHandleChange={(value) =>
            changeGameConfig('terrainLayout', value as string)
          }
        />
        <img
          src={deploymentImages[game?.deployment as string]}
          alt="image_deployment"
          className="w-[400px]"
        />
      </div>
      <div className="flex flex-1 flex-col justify-center px-8">
        <img
          src={terrainLayoutImages[game.terrainLayout as string]}
          alt="image_deployment"
        />
      </div>
    </main>
  );
}
