export default function () {
  return {
    colorTypes: {
      Basic: 'grey',
      Form: 'blue',
    },
    isRightDrawerOpened: true,

    siebelData: {
      accounts: {
        button: {
          type: 'submit',
          color: 'red',
          label: 'stop',
          disabled: false,
          autofocus: false,
        },

        checkbox: {
          value: false,
          label: 'кнопочка',
          readonly: false,
          selected: false,
        },

        input: {
          type: 'text',
          name: 'qwe_input',
          readonly: false,
          placeholder: 'введите qwergthyjg',
        },
      },
      activities: {
        activebutton: {
          type: 'button',
          color: 'blue',
          label: 'biba',
          disabled: false,
          autofocus: false,
        },

        activecheckbox: {
          value: false,
          label: 'кнопочка',
          readonly: false,
          selected: false,
        },

        activeinput: {
          type: 'text',
          name: 'asd_input',
          readonly: false,
          placeholder: 'введите asdfsgf',
        },
      },
    },
  };
}
