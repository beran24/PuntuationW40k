'use client';

import { useCallback, useEffect } from 'react';
import { deployments } from '../constants/deployments';
import { battleSizes } from '../constants/battleSize';
import { missionRules } from '../constants/missionRules';
import { primaryMissions } from '../constants/primaryMissions';
import Selector from './common/Selector';
import Dice from './common/Dice';
import { useGame } from '@/providers/GameContext';
import { getRandomNumber } from '../constants/randomNumber';

export default function ConfigGame() {
  const { game, changeGameConfig } = useGame();

  const onHandleClickDice = useCallback(() => {
    changeGameConfig(
      'deployment',
      deployments[getRandomNumber(0, deployments.length - 1)].id
    );
    changeGameConfig(
      'primaryMission',
      primaryMissions[getRandomNumber(0, primaryMissions.length - 1)].id
    );
    changeGameConfig(
      'missionRule',
      missionRules[getRandomNumber(0, missionRules.length - 1)].id
    );
  }, [changeGameConfig]);

  useEffect(() => {
    onHandleClickDice();
  }, [onHandleClickDice]);

  return (
    <main className="flex-1 flex w-full header justify-center text-white">
      <div className="flex flex-col gap-2">
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
          options={primaryMissions}
          value={game.primaryMission || primaryMissions[0].id}
          onHandleChange={(value) =>
            changeGameConfig('primaryMission', value as string)
          }
        />
        <img
          src={deployments.find((d) => d.id === game.deployment)?.img}
          alt="image_deployment"
          className="w-[400px]"
        />
      </div>
    </main>
  );
}
