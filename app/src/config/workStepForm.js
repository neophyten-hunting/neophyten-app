export default [
  {
    name: 'reporter',
    rules: { required: true },
    type: 'Text',
    label: 'Bearbeiter',
    placeholder: 'Max Mustermann',
    defaultValue: '',
    errorMsg: 'Der Bearbeiter wird benötigt',
  },
  {
    name: 'description',
    rules: { required: false, maxLength: 200 },
    type: 'Text',
    label: 'Beschreibung',
    placeholder: 'Säcke liegen bereit zur Entsorgung',
    defaultValue: '',
    multiline: true,
    errorMsg: 'Die maximale Länge beträgt 200 Zeichen',
  },
  {
    name: 'state',
    rules: { required: true },
    type: 'Dropdown',
    label: 'Status',
    placeholder: 'Chinesische Samtpappel',
    defaultValue: 'WorkInProgress',
    items:
      [
        { label: 'In Bearbeitung', value: 'WorkInProgress' },
        { label: 'Erledigt', value: 'Done' },
      ],
    errorMsg: 'Der Status wird benötigt',
  },
]