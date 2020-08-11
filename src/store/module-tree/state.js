export default function () {
  const treeNodes = [
    {
      label: 'Container',
      componentName: 'QPageContainer',
      requiredProps: {},
      color: 'grey',
      id: window.uuidv4(),
      settings: {
        props: {},
        styling: {
          classes: [],
          css: {},
        },
        data: {},
      },
      children: [
        {
          label: 'Button',
          componentName: 'QBtn',
          requiredProps: {},
          color: 'blue',
          id: window.uuidv4(),
          settings: {
            props: {
              label: 'abc',
            },
            styling: {
              classes: [],
              css: {},
            },
            data: {
              round: {
                attribute: 'round',
                applet: 'activities',
                control: 'activebutton',
                controlProp: 'color',
                value: 'blue',
              },
              'v-show': {
                attribute: 'v-show',
                applet: 'accounts',
                control: 'input',
                controlProp: 'readonly',
                value: 'false',
              },
              click: {
                attribute: 'click',
                modifiers: {
                  once: 'once',
                },
                applet: 'accounts',
                control: 'input',
                controlProp: 'type',
                value: 'text',
              },
            },
          },
        },
        {
          label: 'Checkbox',
          componentName: 'QCheckbox',
          requiredProps: { value: false },
          color: 'blue',
          id: window.uuidv4(),
          settings: {
            props: {},
            styling: {
              classes: [],
              css: {},
            },
            data: {},
          },
        },
      ],
    },
  ];

  return {
    activeElement: treeNodes[0].children[0],
    isReordering: false,
    treeNodes,
  };
}
