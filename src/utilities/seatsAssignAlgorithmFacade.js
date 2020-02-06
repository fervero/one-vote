import { DHONDT, HARE, SAINTE_LAGUE } from '../constants';
import {
  computeAllowingForThresholds as computeHare,
  minVotesToChangeSomething as minVotesHare,
} from './hareNiemeyerHelpers';
import {
  computeAllowingForThresholds as computeDhondt,
  minVotesToChangeSomething as minVotesDhondt,
} from './dHondtHelpers';
import {
  computeAllowingForThresholds as computeSainte,
  minVotesToChangeSomething as minVotesSainte,
} from './sainteLagueHelpers';

export const computeAllowingForThresholds = method => {
  switch (method) {
    case HARE: {
      return computeHare;
    }
    case SAINTE_LAGUE: {
      return computeSainte;
    }
    case DHONDT:
    default: {
      return computeDhondt;
    }
  }
};

export const minVotesToChangeSomething = method => {
  switch (method) {
    case HARE: {
      return minVotesHare;
    }
    case SAINTE_LAGUE: {
      return minVotesSainte;
    }
    case DHONDT:
    default: {
      return minVotesDhondt;
    }
  }
};
