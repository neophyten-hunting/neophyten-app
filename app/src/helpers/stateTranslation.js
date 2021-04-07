function stateTranslation(state) {
  switch (state) {
    case 'Created':
      return 'Erstellt';
    case 'WorkInProgress':
      return 'In Bearbeitung';
    case 'Done':
      return 'Erledigt';
    default:
      return '';
  }
}

export default stateTranslation;