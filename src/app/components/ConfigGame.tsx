'use client';

import { useCallback } from 'react';
import { deployments } from '../constants/deployments';
import { battleSizes } from '../constants/battleSize';
import { missionRules } from '../constants/missionRules';
import { primaryMissionIds } from '../constants/primaryMissions';
import Selector from './common/Selector';
import Dice from './common/Dice';
import { useGame } from '@/providers/GameContext';
import { getRandomNumber } from '../constants/randomNumber';
import { terrainLayouts } from '../constants/terrainLayouts';
import MissionCard from './common/MissionCard';
import { useTranslations } from 'next-intl';

export default function ConfigGame() {
  const { game, changeGameConfig } = useGame();
  const t = useTranslations('primaryMissions');

  const onHandleClickDice = useCallback(() => {
    changeGameConfig(
      'deployment',
      deployments[getRandomNumber(0, deployments.length - 1)].id
    );
    changeGameConfig(
      'primaryMission',
      primaryMissionIds[getRandomNumber(0, primaryMissionIds.length - 1)]
    );
    changeGameConfig(
      'missionRule',
      missionRules[getRandomNumber(0, missionRules.length - 1)].id
    );
    changeGameConfig(
      'terrainLayout',
      terrainLayouts[getRandomNumber(0, terrainLayouts.length - 1)].id
    );
  }, [changeGameConfig]);

  const missionRule = missionRules.find((d) => d.id === game.missionRule);

  return (
    <main className="flex flex-1 w-full header justify-center text-white overflow-y-auto mt-16 mb-16 min-h-[calc(100vh-4rem-4rem)]">
      <div className="flex flex-1 flex-col justify-center px-8">
        <div className="flex flex-row gap-8">
          <div className="w-1/2">
            {game.primaryMission && (
              <MissionCard
                type="Primary Mission"
                title={t(`${game.primaryMission}.name`)}
                subtitle={t(`${game.primaryMission}.history`)}
                section={t(`${game.primaryMission}.ruleDescription`)}
              />
            )}
          </div>
          <div className="w-1/2 ">
            <MissionCard
              type="Mission rule"
              title={missionRule?.name}
              subtitle={missionRule?.history}
              section={missionRule?.ruleDescription}
            />
          </div>
        </div>
      </div>
      <div className="flex-shrink-0 flex-col flex gap-1">
        <div className="flex justify-center">
          <Dice onHandleClickDice={onHandleClickDice} />
        </div>
        <Selector
          label="Select Battle Size"
          options={battleSizes}
          value={game.battleSize}
          onHandleChange={(value) =>
            changeGameConfig('battleSize', value as string)
          }
        />
        <Selector
          label="Select Deployment"
          options={deployments}
          value={game.deployment || deployments[0].id}
          onHandleChange={(value) =>
            changeGameConfig('deployment', value as string)
          }
        />
        <Selector
          label="Select Mission Rule"
          options={missionRules}
          value={game.missionRule || missionRules[0].id}
          onHandleChange={(value) =>
            changeGameConfig('missionRule', value as string)
          }
        />
        <Selector
          label="Select Primary Mission"
          options={primaryMissionIds.map((pm) => ({
            id: pm,
            name: t(`${pm}.name`),
          }))}
          value={game.primaryMission || primaryMissionIds[0]}
          onHandleChange={(value) =>
            changeGameConfig('primaryMission', value as string)
          }
        />
        <Selector
          label="Select Terrain Layout"
          options={terrainLayouts}
          value={game.terrainLayout || terrainLayouts[0].id}
          onHandleChange={(value) =>
            changeGameConfig('terrainLayout', value as string)
          }
        />
        <img
          src={deployments.find((d) => d.id === game.deployment)?.img}
          alt="image_deployment"
          className="w-[400px]"
        />
      </div>
      <div className="flex flex-1 flex-col justify-center px-8">
        <img
          src={terrainLayouts.find((d) => d.id === game.terrainLayout)?.img}
          alt="image_deployment"
        />
      </div>
    </main>
  );
}
