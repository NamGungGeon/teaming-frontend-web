export const SELECT_CHAMPION = 'SELECT_CHAMPION';

export const selectChampion = (selectionType, champion) => ({
  type: SELECT_CHAMPION,
  selectionType,
  champion,
});
