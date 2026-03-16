import { type Unit } from '../components/UnitDisplay';
import tyranidsData from '@/data/tyranids.json';
import worldEatersData from '@/data/world-eaters.json';
import spaceMarinesData from '@/data/space-marines.json';
import darkAngelsData from '@/data/dark-angels.json';
import blackTemplarsData from '@/data/black-templars.json';
import deathwatchData from '@/data/deathwatch.json';
import spaceWolvesData from '@/data/space-wolves.json';
import bloodAngelsData from '@/data/blood-angels.json';
import adeptusCustodesData from '@/data/adeptus-custodes.json';
import adeptusCustodesFwData from '@/data/adeptus-custodes-fw.json';
import tyranidsFwData from '@/data/tyranids-fw.json';

export const mergeUnits = (
  primaryFaction: string,
  primaryUnits: Unit[],
  secondaryFaction: string,
  secondaryUnits: Unit[]
): Unit[] => {
  const taggedPrimary = primaryUnits.map((unit) => ({
    ...unit,
    sourceFaction: primaryFaction,
  }));
  const taggedSecondary = secondaryUnits.map((unit) => ({
    ...unit,
    sourceFaction: secondaryFaction,
  }));

  return [...taggedPrimary, ...taggedSecondary];
};

export const factionData: Record<string, { name: string; units: Unit[] }> = {
  tyranids: {
    name: 'Tyranids',
    units: mergeUnits(
      'Tyranids',
      tyranidsData as Unit[],
      'Tyranids FW',
      tyranidsFwData as Unit[]
    ),
  },
  'world-eaters': {
    name: 'World Eaters',
    units: worldEatersData as Unit[],
  },
  'space-marines': {
    name: 'Space Marines',
    units: spaceMarinesData as Unit[],
  },
  'dark-angels': {
    name: 'Dark Angels',
    units: mergeUnits(
      'Dark Angels',
      darkAngelsData as Unit[],
      'Space Marines',
      spaceMarinesData as Unit[]
    ),
  },
  'black-templars': {
    name: 'Black Templars',
    units: mergeUnits(
      'Black Templars',
      blackTemplarsData as Unit[],
      'Space Marines',
      spaceMarinesData as Unit[]
    ),
  },
  deathwatch: {
    name: 'Deathwatch',
    units: mergeUnits(
      'Deathwatch',
      deathwatchData as Unit[],
      'Space Marines',
      spaceMarinesData as Unit[]
    ),
  },
  'space-wolves': {
    name: 'Space Wolves',
    units: mergeUnits(
      'Space Wolves',
      spaceWolvesData as Unit[],
      'Space Marines',
      spaceMarinesData as Unit[]
    ),
  },
  'blood-angels': {
    name: 'Blood Angels',
    units: mergeUnits(
      'Blood Angels',
      bloodAngelsData as Unit[],
      'Space Marines',
      spaceMarinesData as Unit[]
    ),
  },
  'adeptus-custodes': {
    name: 'Adeptus Custodes',
    units: mergeUnits(
      'Adeptus Custodes',
      adeptusCustodesData as Unit[],
      'Adeptus Custodes FW',
      adeptusCustodesFwData as Unit[]
    ),
  },
};
