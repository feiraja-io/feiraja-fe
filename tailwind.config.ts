module.exports = {
    plugins: [
      require('daisyui'),
    ],
    theme: {
        extend: {
          colors: {
            'light-black': '#191919',
            background: {
                white: '#ffffff',
              },
         },
          fontFamily: {
            primary: ['Amulya', 'sans-serif'],
          },
          fontWeight: {
            medium: 500,
          },
        },
    },
    daisyui: {
      themes: [
        {
          light: {
            ...require("daisyui/src/theming/themes")["light"],
            "primary": "#5C52B9",
          },
        },
      ],
    },
  }